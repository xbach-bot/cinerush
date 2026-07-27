package com.cinerush.controller;

import com.cinerush.common.response.ApiResponse;
import com.cinerush.auth.repository.UserRepository;
import com.cinerush.auth.entity.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HealthCheckController {

    private final UserRepository userRepository;

    @GetMapping("/health")
    public ApiResponse<List<String>> healthCheck() {
        // Query tất cả người dùng trong Database thông qua repository
        List<String> userEmails = userRepository.findAll().stream()
                .map(User::getEmail)
                .collect(Collectors.toList());

        return ApiResponse.<List<String>>builder()
                .status(200)
                .code("SUCCESS")
                .message("Hệ thống hoạt động bình thường, kết nối DB OK")
                .data(userEmails)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
