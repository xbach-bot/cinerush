package com.cinerush.auth.dto;

import com.cinerush.auth.entity.Gender;
import com.cinerush.auth.entity.UserStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String avatarUrl;
    private UserStatus status;
    private Boolean emailVerified;
    private Set<String> roles;
    private LocalDateTime createdAt;
}
