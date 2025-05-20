package utez.edu.mx.back.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vehiculo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class VehiculoBean {
    @Id
    @GeneratedValue
    private Long id;

    private String marca;
    private String modelo;
    private String color;

    @Column(unique = true)
    private String placas;

    private String nombreProveedor;
}
