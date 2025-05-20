package utez.edu.mx.back.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.back.dto.VehiculoDto;
import utez.edu.mx.back.modelo.ApiResponse;
import utez.edu.mx.back.service.VehiculoService;

import java.util.UUID;

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
    public ResponseEntity<ApiResponse> delete(@PathVariable UUID id) {
        return service.delete(id);
    }

    @GetMapping("/mostrar")
    public ResponseEntity<ApiResponse> getAll() {
        return service.getAll();
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ApiResponse> update(@PathVariable UUID id, @RequestBody VehiculoDto dto) {
        return service.update(id, dto.toEntity());
    }

    @GetMapping("/mostrar/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable UUID id) {
        return service.getById(id);
    }
}