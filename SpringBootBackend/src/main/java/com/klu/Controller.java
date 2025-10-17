package com.klu;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Crud/")
@CrossOrigin(origins="*")
public class Controller {

    @Autowired 
    CrudServ cs;

    @GetMapping("/")
    public String demo() {
        return "CRUD OPERATIONS";
    }

    @PostMapping("/add")
    public Crud insert(@RequestBody Crud crud) {
        return cs.add(crud);
    }

    @GetMapping("/all")
    public List<Crud> get() {
        return cs.getall();
    }

    @DeleteMapping("/del/{id}")
    public void del(@PathVariable int id) {
        cs.delete(id);
    }

    // ---- UPDATE ENDPOINT ----
    @PutMapping("/update/{id}")
    public Crud update(@PathVariable int id, @RequestBody Crud crud) {
        return cs.update(id, crud);
    }
}
