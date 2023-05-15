
package com.example.demo.config;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
import com.example.demo.model.*;

@Component
public class HandShakeHandlerConfig extends DefaultHandshakeHandler {

    private Map<String, UserPrincipal> userPrincipalMap = new ConcurrentHashMap<>();

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        String sessionId = request.getURI().getQuery().split("=")[1];

        UserPrincipal userPrincipal = userPrincipalMap.get(sessionId);
        if (userPrincipal == null) {
            userPrincipal = new UserPrincipal(sessionId);
            
            userPrincipalMap.put(sessionId, userPrincipal);
        }

        return userPrincipal;
    }

}


