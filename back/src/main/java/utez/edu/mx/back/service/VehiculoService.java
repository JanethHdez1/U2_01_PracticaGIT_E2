package utez.edu.mx.back.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class VehiculoService {

    private final VehiculoRepository repository;

    public ResponseEntity<ApiResponse> save(VehiculoBean vehiculo) {
        if (repository.findByPlacas(vehiculo.getPlacas()).isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Las placas ya existen"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(vehiculo), HttpStatus.OK, false, "Vehículo registrado"), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<VehiculoBean> found = repository.findById(id);
        if (found.isPresent()) {
            repository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Vehículo eliminado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Vehículo no encontrado"), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<ApiResponse> update(Long id, VehiculoBean nuevoVehiculo) {
        Optional<VehiculoBean> encontrado = repository.findById(id);
        if (encontrado.isPresent()) {
            VehiculoBean actual = encontrado.get();
            actual.setMarca(nuevoVehiculo.getMarca());
            actual.setModelo(nuevoVehiculo.getModelo());
            actual.setColor(nuevoVehiculo.getColor());
            actual.setNombreProveedor(nuevoVehiculo.getNombreProveedor());

            if (!actual.getPlacas().equals(nuevoVehiculo.getPlacas()) &&
                    repository.findByPlacas(nuevoVehiculo.getPlacas()).isPresent()) {
                return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Las placas ya existen"), HttpStatus.BAD_REQUEST);
            }

            actual.setPlacas(nuevoVehiculo.getPlacas());

            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(actual), HttpStatus.OK, false, "Actualización exitosa"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Vehículo no encontrado"), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<ApiResponse> getAll() {
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK), HttpStatus.OK);
    }

}
