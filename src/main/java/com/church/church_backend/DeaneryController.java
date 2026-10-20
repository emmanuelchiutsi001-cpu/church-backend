package com.church.church_backend;

import java.text.Normalizer;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deaneries")
public class DeaneryController {
    private final DeaneryRepository deaneries;
    private final ParishRepository parishes;
    private final PriestRepository priests;
    private final DeaneryEventRepository events;

    public DeaneryController(DeaneryRepository deaneries, ParishRepository parishes, PriestRepository priests, DeaneryEventRepository events) {
        this.deaneries = deaneries; this.parishes = parishes; this.priests = priests; this.events = events;
    }

    @GetMapping
    public ResponseEntity<List<Map<String,Object>>> list() {
        List<Map<String,Object>> out = deaneries.findAllByOrderByNameAsc().stream().map(d -> {
            Map<String,Object> m = dto(d); m.put("parishCount", parishes.findByDeaneryId(d.getId()).size()); return m;
        }).collect(Collectors.toList());
        return ResponseEntity.ok().cacheControl(CacheControl.maxAge(24, TimeUnit.HOURS).cachePublic()).body(out);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        Optional<Deanery> found = deaneries.findById(id); if(found.isEmpty()) return error(HttpStatus.NOT_FOUND,"Deanery not found");
        Deanery d=found.get(); Map<String,Object> out=dto(d); List<Parish> ps=parishes.findByDeaneryId(id);
        out.put("parishCount",ps.size()); out.put("parishes",ps.stream().map(this::parishDto).collect(Collectors.toList()));
        out.put("dean", d.getDeanId()==null?null:priests.findById(d.getDeanId()).map(this::priestDto).orElse(null));
        out.put("viceDean", d.getViceDeanId()==null?null:priests.findById(d.getViceDeanId()).map(this::priestDto).orElse(null));
        return ResponseEntity.ok(out);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Deanery input) {
        if(blank(input.getName())) return error(HttpStatus.BAD_REQUEST,"Deanery name is required");
        if(!validPriest(input.getDeanId()) || !validPriest(input.getViceDeanId())) return error(HttpStatus.BAD_REQUEST,"Dean and vice-dean IDs must refer to existing priests");
        Deanery d=new Deanery(); d.setName(input.getName().trim()); d.setSlug(uniqueSlug(input.getName(),null));
        d.setDescription(input.getDescription()); d.setTerritory(input.getTerritory()); d.setDeanId(input.getDeanId()); d.setViceDeanId(input.getViceDeanId());
        d.setArchdioceseId(input.getArchdioceseId()==null?1L:input.getArchdioceseId()); d.setStatus(normalizeStatus(input.getStatus()));
        return ResponseEntity.status(HttpStatus.CREATED).body(dto(deaneries.save(d)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody Deanery input) {
        Optional<Deanery> found=deaneries.findById(id); if(found.isEmpty()) return error(HttpStatus.NOT_FOUND,"Deanery not found");
        Deanery d=found.get();
        if(!blank(input.getName())) { d.setName(input.getName().trim()); d.setSlug(uniqueSlug(input.getName(),id)); }
        if(input.getDescription()!=null)d.setDescription(input.getDescription()); if(input.getTerritory()!=null)d.setTerritory(input.getTerritory());
        if(input.getDeanId()!=null){if(!priests.existsById(input.getDeanId()))return error(HttpStatus.BAD_REQUEST,"Dean priest not found");d.setDeanId(input.getDeanId());}
        if(input.getViceDeanId()!=null){if(!priests.existsById(input.getViceDeanId()))return error(HttpStatus.BAD_REQUEST,"Vice-dean priest not found");d.setViceDeanId(input.getViceDeanId());}
        if(input.getArchdioceseId()!=null)d.setArchdioceseId(input.getArchdioceseId()); if(!blank(input.getStatus()))d.setStatus(normalizeStatus(input.getStatus()));
        return ResponseEntity.ok(dto(deaneries.save(d)));
    }

    @DeleteMapping("/{id}") @Transactional
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if(!deaneries.existsById(id))return error(HttpStatus.NOT_FOUND,"Deanery not found");
        if(!parishes.findByDeaneryId(id).isEmpty())return error(HttpStatus.CONFLICT,"Cannot delete a deanery while it has parishes. Reassign or delete its parishes first.");
        events.findByDeaneryId(id).forEach(events::delete); deaneries.deleteById(id);
        return ResponseEntity.ok(Map.of("message","Deanery deleted","id",id));
    }

    @GetMapping("/{id}/parishes")
    public ResponseEntity<?> listParishes(@PathVariable Long id) {
        if(!deaneries.existsById(id))return error(HttpStatus.NOT_FOUND,"Deanery not found");
        return ResponseEntity.ok(parishes.findByDeaneryId(id).stream().map(this::parishDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<?> stats(@PathVariable Long id) {
        if(!deaneries.existsById(id))return error(HttpStatus.NOT_FOUND,"Deanery not found");
        List<Parish> ps=parishes.findByDeaneryId(id); long catholics=ps.stream().map(Parish::getCatholicCount).filter(Objects::nonNull).mapToLong(Long::longValue).sum();
        return ResponseEntity.ok(Map.of("deaneryId",id,"totalParishes",ps.size(),"totalPriests",priests.findByDeaneryId(id).size(),"totalCatholics",catholics));
    }

    @PutMapping("/{id}/assign-dean")
    public ResponseEntity<?> assignDean(@PathVariable Long id,@RequestBody Map<String,Object> body) {
        Optional<Deanery> found=deaneries.findById(id); if(found.isEmpty())return error(HttpStatus.NOT_FOUND,"Deanery not found");
        Long priestId=toLong(body.get("dean_id")); if(priestId==null||!priests.existsById(priestId))return error(HttpStatus.BAD_REQUEST,"dean_id must refer to an existing priest");
        Deanery d=found.get(); d.setDeanId(priestId); return ResponseEntity.ok(dto(deaneries.save(d)));
    }

    private boolean validPriest(Long id){return id==null||priests.existsById(id);} private boolean blank(String s){return s==null||s.trim().isEmpty();}
    private String normalizeStatus(String s){return blank(s)?"ACTIVE":s.trim().toUpperCase(Locale.ROOT);}
    private Long toLong(Object o){try{return o==null?null:Long.valueOf(o.toString());}catch(Exception e){return null;}}
    private ResponseEntity<Map<String,String>> error(HttpStatus status,String message){return ResponseEntity.status(status).body(Map.of("error",message));}
    private String uniqueSlug(String name,Long currentId){String base=Normalizer.normalize(name,Normalizer.Form.NFD).replaceAll("\\p{M}","").toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+","-").replaceAll("^-|-$","");if(base.isBlank())base="deanery";String s=base;int i=2;while(slugTaken(s,currentId))s=base+"-"+i++;return s;}
    private boolean slugTaken(String slug,Long currentId){for(Deanery d:deaneries.findAll())if(Objects.equals(d.getSlug(),slug)&&!Objects.equals(d.getId(),currentId))return true;return false;}
    private Map<String,Object> dto(Deanery d){Map<String,Object> m=new LinkedHashMap<>();m.put("id",d.getId());m.put("name",d.getName());m.put("slug",d.getSlug());m.put("description",d.getDescription());m.put("territory",d.getTerritory());m.put("deanId",d.getDeanId());m.put("viceDeanId",d.getViceDeanId());m.put("archdioceseId",d.getArchdioceseId());m.put("status",d.getStatus());return m;}
    private Map<String,Object> parishDto(Parish p){Map<String,Object> m=new LinkedHashMap<>();m.put("id",p.getId());m.put("deaneryId",p.getDeaneryId());m.put("name",p.getName());m.put("slug",p.getSlug());m.put("parishPriestId",p.getParishPriestId());m.put("assistantPriestId",p.getAssistantPriestId());m.put("address",p.getAddress());m.put("latitude",p.getLatitude());m.put("longitude",p.getLongitude());m.put("phone",p.getPhone());m.put("email",p.getEmail());m.put("yearEstablished",p.getYearEstablished());m.put("imageUrl",p.getImageUrl());m.put("facebookPageUrl",p.getFacebookPageUrl());m.put("catholicCount",p.getCatholicCount()==null?0L:p.getCatholicCount());return m;}
    private Map<String,Object> priestDto(Priest p){Map<String,Object> m=new LinkedHashMap<>();m.put("id",p.getId());m.put("name",p.getName());m.put("title",p.getTitle());m.put("photoUrl",p.getPhotoUrl());m.put("role",p.getRole());m.put("deaneryId",p.getDeaneryId());m.put("parishId",p.getParishId());m.put("phone",p.getPhone());m.put("email",p.getEmail());m.put("bio",p.getBio());return m;}
}
