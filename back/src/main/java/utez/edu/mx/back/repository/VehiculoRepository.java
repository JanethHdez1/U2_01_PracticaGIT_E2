package utez.edu.mx.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utez.edu.mx.back.modelo.bean.VehiculoBean;

import java.util.Optional;
import java.util.UUID;

public interface VehiculoRepository extends JpaRepository<VehiculoBean, UUID> {
    Optional<VehiculoBean> findByPlacas(String placas);
}