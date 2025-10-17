package com.klu;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrudServ {

    @Autowired 
    CurdRepo cr;

    public Crud add(Crud crud) {
        return cr.save(crud);
    }

    public List<Crud> getall() {
        return cr.findAll();
    }

    public void delete(int id) {
        cr.deleteById(id);
    }

    // ---- UPDATE METHOD ----
    public Crud update(int id, Crud crud) {
        Crud existing = cr.findById(id)
                          .orElseThrow(() -> new RuntimeException("Record not found with ID: " + id));
        existing.setName(crud.getName());
        existing.setDep(crud.getDep());
        return cr.save(existing);
    }
}
