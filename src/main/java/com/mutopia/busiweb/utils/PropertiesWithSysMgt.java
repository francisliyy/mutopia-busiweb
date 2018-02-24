/**
 * <p>Title: PropertiesWithSysMgt</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2018</p>
 * <p>Company: MUTOPIA</p>
 * @author lyx
 * @version 1.0
 */
package com.mutopia.busiweb.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@PropertySource("classpath:sys.properties")
public class PropertiesWithSysMgt {
	
   @Bean
   public static PropertySourcesPlaceholderConfigurer
     propertySourcesPlaceholderConfigurer() {
      return new PropertySourcesPlaceholderConfigurer();
   }

}
