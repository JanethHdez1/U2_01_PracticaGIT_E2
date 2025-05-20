package utez.edu.mx.back.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/practica/vehiculo")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class VehiculoController {
    private final VehiculoService service;

    @PostMapping("/registrar")
    public ResponseEntity<ApiResponse> save(@RequestBody VehiculoDto dto) {
        return service.save(dto.toEntity());
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        return service.delete(id);
    }

    @GetMapping("/mostrar")
    public ResponseEntity<ApiResponse> getAll() {
        return service.getAll();
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable Long id, @RequestBody VehiculoDto dto) {
        return service.update(id, dto.toEntity());
    }
}
