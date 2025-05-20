package utez.edu.mx.back.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ApiResponse {

    private Object data;
    private String token;
    private HttpStatus status;
    private boolean error;
    private String message;

    public ApiResponse(Object data, String token, HttpStatus status, String message) {
        this.data = data;
        this.token = token;
        this.status = status;
        this.message = message;
    }

    public ApiResponse(Object data, HttpStatus status, boolean error, String message) {
        this.data = data;
        this.status = status;
        this.error = error;
        this.message = message;
    }

    public ApiResponse(Object data, HttpStatus status) {
        this.data = data;
        this.status = status;
    }

    public ApiResponse(HttpStatus status, boolean error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
    }

    public ApiResponse(Object data, HttpStatus status, String message) {
        this.data = data;
        this.status = status;
        this.message = message;
    }
}