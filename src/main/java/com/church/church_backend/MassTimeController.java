package com.church.church_backend;

import java.util.*; import org.springframework.http.HttpStatus; import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api")
public class MassTimeController {
 private final MassTimeRepository massTimes; private final ParishRepository parishes;
 public MassTimeController(MassTimeRepository massTimes,ParishRepository parishes){this.massTimes=massTimes;this.parishes=parishes;}
 @GetMapping("/mass-times") public ResponseEntity<?> list(@RequestParam(name="parish_id",required=false) Long parishId){if(parishId!=null){if(!parishes.existsById(parishId))return error(HttpStatus.NOT_FOUND,"Parish not found");return ResponseEntity.ok(massTimes.findByParishId(parishId));}return ResponseEntity.ok(massTimes.findAll());}
 @GetMapping("/mass-times/{id}") public ResponseEntity<?> get(@PathVariable Long id){return massTimes.findById(id).<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(()->error(HttpStatus.NOT_FOUND,"Mass time not found"));}
 @PostMapping("/parishes/{parishId}/mass-times") public ResponseEntity<?> create(@PathVariable Long parishId,@RequestBody MassTime in){if(!parishes.existsById(parishId))return error(HttpStatus.NOT_FOUND,"Parish not found");if(blank(in.getDay())||blank(in.getTime()))return error(HttpStatus.BAD_REQUEST,"Mass day and time are required");in.setId(null);in.setParishId(parishId);return ResponseEntity.status(HttpStatus.CREATED).body(massTimes.save(in));}
 @PutMapping("/mass-times/{id}") public ResponseEntity<?> update(@PathVariable Long id,@RequestBody MassTime in){Optional<MassTime> f=massTimes.findById(id);if(f.isEmpty())return error(HttpStatus.NOT_FOUND,"Mass time not found");MassTime m=f.get();if(in.getDay()!=null)m.setDay(in.getDay());if(in.getTime()!=null)m.setTime(in.getTime());if(in.getLanguage()!=null)m.setLanguage(in.getLanguage());if(in.getType()!=null)m.setType(in.getType());if(in.getParishId()!=null){if(!parishes.existsById(in.getParishId()))return error(HttpStatus.BAD_REQUEST,"Parish not found");m.setParishId(in.getParishId());}if(blank(m.getDay())||blank(m.getTime()))return error(HttpStatus.BAD_REQUEST,"Mass day and time are required");return ResponseEntity.ok(massTimes.save(m));}
 @DeleteMapping("/mass-times/{id}") public ResponseEntity<?> delete(@PathVariable Long id){if(!massTimes.existsById(id))return error(HttpStatus.NOT_FOUND,"Mass time not found");massTimes.deleteById(id);return ResponseEntity.ok(Map.of("message","Mass time deleted","id",id));}
 private boolean blank(String s){return s==null||s.trim().isEmpty();}private ResponseEntity<Map<String,String>> error(HttpStatus s,String m){return ResponseEntity.status(s).body(Map.of("error",m));}
}
