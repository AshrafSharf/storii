package com.storii;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.storii.daos.StoriiUserDAO;
import com.storii.models.StoriiUser;

@Configuration
class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

  @Autowired
  StoriiUserDAO storiiUserDAO;

  @Override
  public void init(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService()).passwordEncoder(new BCryptPasswordEncoder());
  }

  /**
   * this converts the login data of the user to a user-entity and compares it to the users in the
   * database, looking for a match to confirm a registered user
   */
  @Bean
  UserDetailsService userDetailsService() {
    return new UserDetailsService() {

      @Override
      public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
    	StoriiUser account = storiiUserDAO.findByName(name);
        if(account != null) {
        return new User(account.getName(), account.getPassword(), true, true, true, true,
                AuthorityUtils.createAuthorityList("ROLE_"+account.getRole().toString()));
        } else {
          throw new UsernameNotFoundException("could not find the user '"
                  + name + "'");
        }
      }
      
    };
  }
}

/**
 * the security configuration for this web application
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
//@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@EnableWebSecurity
class WebSecurityConfig extends WebSecurityConfigurerAdapter {
 
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
		//.anyRequest().fullyAuthenticated()
    	//.antMatchers("/nope").fullyAuthenticated()
		.anyRequest().permitAll()
    	.and()
	    	.httpBasic()
	    	/*
	    .and()
		    .logout()
	        .logoutUrl("/logout")
	        .logoutSuccessUrl("/test")
	        */
	    .and()
	    	.csrf().disable();
  }
  
}