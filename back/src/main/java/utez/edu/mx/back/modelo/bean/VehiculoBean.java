package utez.edu.mx.back.modelo.bean;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "vehiculos", uniqueConstraints = {
        @UniqueConstraint(columnNames = "placas") // Definición única a nivel de tabla
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehiculoBean {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String marca;

    @Column(length = 50, nullable = false)
    private String modelo;

    @Column(length = 30, nullable = false)
    private String color;

    @Column(length = 10, unique = true, nullable = false)
    private String placas;

    @Column(name = "nombre_proveedor", length = 100)
    private String nombreProveedor;
}