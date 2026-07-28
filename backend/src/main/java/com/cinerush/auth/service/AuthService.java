package com.cinerush.auth.service;

import com.cinerush.auth.dto.AuthResponse;
import com.cinerush.auth.dto.LoginRequest;
import com.cinerush.auth.dto.RegisterRequest;
import com.cinerush.auth.dto.UserResponse;
import com.cinerush.auth.entity.Role;
import com.cinerush.auth.entity.User;
import com.cinerush.auth.entity.UserStatus;
import com.cinerush.auth.repository.RoleRepository;
import com.cinerush.auth.repository.UserRepository;
import com.cinerush.common.exception.AppException;
import com.cinerush.common.exception.ErrorCode;
import com.cinerush.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        Role customerRole = roleRepository.findByCode("CUSTOMER")
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .status(UserStatus.ACTIVE)
                .emailVerified(false)
                .roles(Collections.singleton(customerRole))
                .build();

        User savedUser = userRepository.save(user);

        return mapToUserResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        String token = jwtTokenProvider.generateToken(user);

        Set<String> roles = user.getRoles().stream()
                .map(Role::getCode)
                .collect(Collectors.toSet());

        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .fullName(user.getFullName())
                .roles(roles)
                .build();
    }

    public UserResponse mapToUserResponse(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(Role::getCode)
                .collect(Collectors.toSet());

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .avatarUrl(user.getAvatarUrl())
                .status(user.getStatus())
                .emailVerified(user.getEmailVerified())
                .roles(roles)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
