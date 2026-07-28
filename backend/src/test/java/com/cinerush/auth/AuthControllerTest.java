package com.cinerush.auth;

import com.cinerush.auth.controller.AuthController;
import com.cinerush.auth.dto.AuthResponse;
import com.cinerush.auth.dto.LoginRequest;
import com.cinerush.auth.dto.RegisterRequest;
import com.cinerush.auth.dto.UserResponse;
import com.cinerush.auth.service.AuthService;
import com.cinerush.common.exception.AppException;
import com.cinerush.common.exception.ErrorCode;
import com.cinerush.common.exception.GlobalExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(authController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("Đăng ký thành công - trả về HTTP 201 và gán vai trò CUSTOMER")
    void register_Success() throws Exception {
        RegisterRequest request = RegisterRequest.builder()
                .email("customer@cinerush.com")
                .password("password123")
                .fullName("Nguyen Van A")
                .phone("0912345678")
                .build();

        UserResponse userResponse = UserResponse.builder()
                .id(1L)
                .email("customer@cinerush.com")
                .fullName("Nguyen Van A")
                .phone("0912345678")
                .roles(Set.of("CUSTOMER"))
                .build();

        when(authService.register(any(RegisterRequest.class))).thenReturn(userResponse);

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.code").value("SUCCESS"))
                .andExpect(jsonPath("$.data.email").value("customer@cinerush.com"))
                .andExpect(jsonPath("$.data.roles[0]").value("CUSTOMER"));
    }

    @Test
    @DisplayName("Đăng ký với email đã tồn tại - trả về HTTP 409 Conflict")
    void register_DuplicateEmail_Returns409() throws Exception {
        RegisterRequest request = RegisterRequest.builder()
                .email("existing@cinerush.com")
                .password("password123")
                .fullName("Nguyen Van A")
                .phone("0912345678")
                .build();

        when(authService.register(any(RegisterRequest.class)))
                .thenThrow(new AppException(ErrorCode.EMAIL_ALREADY_EXISTS));

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409))
                .andExpect(jsonPath("$.code").value("EMAIL_ALREADY_EXISTS"));
    }

    @Test
    @DisplayName("Đăng nhập thành công - trả về HTTP 200, accessToken, userId, fullName và roles")
    void login_Success() throws Exception {
        LoginRequest request = LoginRequest.builder()
                .email("customer@cinerush.com")
                .password("password123")
                .build();

        AuthResponse authResponse = AuthResponse.builder()
                .accessToken("mock-jwt-token")
                .tokenType("Bearer")
                .userId(1L)
                .fullName("Nguyen Van A")
                .roles(Set.of("CUSTOMER"))
                .build();

        when(authService.login(any(LoginRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.data.accessToken").value("mock-jwt-token"))
                .andExpect(jsonPath("$.data.userId").value(1))
                .andExpect(jsonPath("$.data.fullName").value("Nguyen Van A"))
                .andExpect(jsonPath("$.data.roles[0]").value("CUSTOMER"));
    }

    @Test
    @DisplayName("Đăng nhập thất bại do sai mật khẩu - trả về HTTP 401 Unauthorized")
    void login_WrongCredentials_Returns401() throws Exception {
        LoginRequest request = LoginRequest.builder()
                .email("customer@cinerush.com")
                .password("wrongpassword")
                .build();

        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new AppException(ErrorCode.INVALID_CREDENTIALS));

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.code").value("INVALID_CREDENTIALS"));
    }
}
