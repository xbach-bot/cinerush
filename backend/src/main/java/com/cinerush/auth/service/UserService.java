package com.cinerush.auth.service;

import com.cinerush.auth.dto.UserResponse;
import com.cinerush.auth.entity.User;
import com.cinerush.auth.repository.UserRepository;
import com.cinerush.common.exception.AppException;
import com.cinerush.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    public UserResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        Object principal = authentication.getPrincipal();
        User user;

        if (principal instanceof User) {
            user = (User) principal;
        } else if (principal instanceof String) {
            String email = (String) principal;
            user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        } else {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return authService.mapToUserResponse(user);
    }
}
