package utez.edu.mx.back.modelo;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiResponse {
    private Object data;
    private HttpStatus status;
    private boolean error;
    private String message;

    public ApiResponse(Object data, HttpStatus status) {
        this.data = data;
        this.status = status;
    }

    public ApiResponse(HttpStatus status, boolean error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
    }

    public ApiResponse(Object data, HttpStatus status, boolean error, String message) {
        this.data = data;
        this.status = status;
        this.error = error;
        this.message = message;
    }
}