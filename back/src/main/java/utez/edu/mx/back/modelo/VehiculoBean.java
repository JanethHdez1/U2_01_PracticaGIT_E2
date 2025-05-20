package utez.edu.mx.back.modelo;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "vehiculos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VehiculoBean {

        @Id
        @GeneratedValue
        private UUID id;

        private String marca;
        private String modelo;
        private String color;

        @Column(unique = true)
        private String placas;

        private String nombreProveedor;

}
