package com.cinerush.auth.controller;

import com.cinerush.auth.dto.UserResponse;
import com.cinerush.auth.service.UserService;
import com.cinerush.common.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser() {
        UserResponse userResponse = userService.getCurrentUser();

        ApiResponse<UserResponse> apiResponse = ApiResponse.<UserResponse>builder()
                .status(200)
                .code("SUCCESS")
                .message("Lấy thông tin người dùng thành công")
                .data(userResponse)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResponse);
    }
}
