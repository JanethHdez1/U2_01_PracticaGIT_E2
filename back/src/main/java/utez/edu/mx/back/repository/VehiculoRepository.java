package utez.edu.mx.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utez.edu.mx.back.model.VehiculoBean;

import java.util.Optional;

public interface VehiculoRepository extends JpaRepository<VehiculoBean, Long > {

        Optional<VehiculoBean> findByPlacas(String placas);

}
