package com.klu;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
 

@Entity
public class Crud {

	@Id
	private int id;
   
    private String name;
    private String dep;
    

    public Crud() {
        super();
    }

    @Override
    public String toString() {
        return "Crud [id=" + id + ", name=" + name + ", dep=" + dep + "]";
    }

    // getters and setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDep() {
        return dep;
    }
    public void setDep(String dep) {
        this.dep = dep;
    }
    
}
