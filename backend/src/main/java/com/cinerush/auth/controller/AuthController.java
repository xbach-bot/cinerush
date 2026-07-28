package com.cinerush.auth.controller;

import com.cinerush.auth.dto.AuthResponse;
import com.cinerush.auth.dto.LoginRequest;
import com.cinerush.auth.dto.RegisterRequest;
import com.cinerush.auth.dto.UserResponse;
import com.cinerush.auth.service.AuthService;
import com.cinerush.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request) {
        UserResponse userResponse = authService.register(request);

        ApiResponse<UserResponse> apiResponse = ApiResponse.<UserResponse>builder()
                .status(HttpStatus.CREATED.value())
                .code("SUCCESS")
                .message("Đăng ký tài khoản thành công")
                .data(userResponse)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse authResponse = authService.login(request);

        ApiResponse<AuthResponse> apiResponse = ApiResponse.<AuthResponse>builder()
                .status(HttpStatus.OK.value())
                .code("SUCCESS")
                .message("Đăng nhập thành công")
                .data(authResponse)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResponse);
    }
}
