package utez.edu.mx.back.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.back.modelo.bean.VehiculoBean;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class VehiculoDto {
    private UUID id;
    private String marca;
    private String modelo;
    private String color;
    private String placas;
    private String nombreProveedor;

    public VehiculoBean toEntity() {
        return new VehiculoBean(id, marca, modelo, color, placas, nombreProveedor);
    }
}