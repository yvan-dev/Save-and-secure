package com.cloud.saveandsecure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cloud.saveandsecure.security.JWTAuthorizationFilter;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class SaveAndSecureApplication {

	public static void main(String[] args) {
		SpringApplication.run(SaveAndSecureApplication.class, args);
	}
	
	@EnableWebSecurity
	@Configuration
	@EnableSwagger2
	class WebSecurityConfig extends WebSecurityConfigurerAdapter {

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.csrf().disable()
				.addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
				.authorizeRequests()
				.antMatchers(HttpMethod.POST, "/login").permitAll()
				.antMatchers(
	                    HttpMethod.GET,
	                    "/",
	                    "/v2/api-docs",           // swagger
	                    "/webjars/**",            // swagger-ui webjars
	                    "/swagger-resources/**",  // swagger-ui resources
	                    "/configuration/**",      // swagger configuration
	                    "/*.html",
	                    "/favicon.ico",
	                    "/**/*.html",
	                    "/**/*.css",
	                    "/**/*.js"
	            ).permitAll()
				.antMatchers(HttpMethod.GET, "/swagger-ui.html").permitAll()
				.anyRequest().authenticated();
		}
	}

}
