package com.church.church_backend;

import java.util.*; import org.springframework.http.HttpStatus; import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api")
public class DeaneryEventController {
 private final DeaneryEventRepository events; private final DeaneryRepository deaneries;
 public DeaneryEventController(DeaneryEventRepository events,DeaneryRepository deaneries){this.events=events;this.deaneries=deaneries;}
 @GetMapping("/deanery-events") public ResponseEntity<?> list(@RequestParam(name="deanery_id",required=false) Long deaneryId){if(deaneryId!=null){if(!deaneries.existsById(deaneryId))return error(HttpStatus.NOT_FOUND,"Deanery not found");return ResponseEntity.ok(events.findByDeaneryId(deaneryId));}return ResponseEntity.ok(events.findAll());}
 @GetMapping("/deanery-events/{id}") public ResponseEntity<?> get(@PathVariable Long id){return events.findById(id).<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(()->error(HttpStatus.NOT_FOUND,"Event not found"));}
 @GetMapping("/deaneries/{id}/events") public ResponseEntity<?> listForDeanery(@PathVariable Long id){if(!deaneries.existsById(id))return error(HttpStatus.NOT_FOUND,"Deanery not found");return ResponseEntity.ok(events.findByDeaneryId(id));}
 @PostMapping("/deaneries/{id}/events") public ResponseEntity<?> create(@PathVariable Long id,@RequestBody DeaneryEvent in){if(!deaneries.existsById(id))return error(HttpStatus.NOT_FOUND,"Deanery not found");if(blank(in.getTitle()))return error(HttpStatus.BAD_REQUEST,"Event title is required");in.setId(null);in.setDeaneryId(id);return ResponseEntity.status(HttpStatus.CREATED).body(events.save(in));}
 @PutMapping("/deanery-events/{id}") public ResponseEntity<?> update(@PathVariable Long id,@RequestBody DeaneryEvent in){Optional<DeaneryEvent> f=events.findById(id);if(f.isEmpty())return error(HttpStatus.NOT_FOUND,"Event not found");if(in.getDeaneryId()!=null&&!deaneries.existsById(in.getDeaneryId()))return error(HttpStatus.BAD_REQUEST,"Deanery not found");DeaneryEvent e=f.get();if(in.getTitle()!=null)e.setTitle(in.getTitle());if(in.getDate()!=null)e.setDate(in.getDate());if(in.getLocation()!=null)e.setLocation(in.getLocation());if(in.getDescription()!=null)e.setDescription(in.getDescription());if(in.getDeaneryId()!=null)e.setDeaneryId(in.getDeaneryId());if(blank(e.getTitle()))return error(HttpStatus.BAD_REQUEST,"Event title is required");return ResponseEntity.ok(events.save(e));}
 @DeleteMapping("/deanery-events/{id}") public ResponseEntity<?> delete(@PathVariable Long id){if(!events.existsById(id))return error(HttpStatus.NOT_FOUND,"Event not found");events.deleteById(id);return ResponseEntity.ok(Map.of("message","Event deleted","id",id));}
 private boolean blank(String s){return s==null||s.trim().isEmpty();}private ResponseEntity<Map<String,String>> error(HttpStatus s,String m){return ResponseEntity.status(s).body(Map.of("error",m));}
}
