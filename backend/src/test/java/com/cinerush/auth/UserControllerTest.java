package com.cinerush.auth;

import com.cinerush.auth.controller.UserController;
import com.cinerush.auth.dto.UserResponse;
import com.cinerush.auth.service.UserService;
import com.cinerush.common.exception.AppException;
import com.cinerush.common.exception.ErrorCode;
import com.cinerush.common.exception.GlobalExceptionHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Set;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    @DisplayName("GET /api/v1/users/me thành công - trả về đúng thông tin user")
    void getCurrentUser_Success() throws Exception {
        UserResponse userResponse = UserResponse.builder()
                .id(1L)
                .email("customer@cinerush.com")
                .fullName("Nguyen Van A")
                .phone("0912345678")
                .roles(Set.of("CUSTOMER"))
                .build();

        when(userService.getCurrentUser()).thenReturn(userResponse);

        mockMvc.perform(get("/api/v1/users/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.code").value("SUCCESS"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.email").value("customer@cinerush.com"))
                .andExpect(jsonPath("$.data.fullName").value("Nguyen Van A"));
    }

    @Test
    @DisplayName("GET /api/v1/users/me chưa xác thực - trả về HTTP 401 Unauthorized")
    void getCurrentUser_Unauthenticated_Returns401() throws Exception {
        when(userService.getCurrentUser()).thenThrow(new AppException(ErrorCode.UNAUTHENTICATED));

        mockMvc.perform(get("/api/v1/users/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.code").value("UNAUTHENTICATED"));
    }
}
