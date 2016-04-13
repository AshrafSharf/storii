package storii.app.web.rest;

import storii.app.Application;
import storii.app.domain.UserImage;
import storii.app.repository.UserImageRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the UserImageResource REST controller.
 *
 * @see UserImageResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class UserImageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_PATH = "AAAAA";
    private static final String UPDATED_PATH = "BBBBB";

    @Inject
    private UserImageRepository userImageRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUserImageMockMvc;

    private UserImage userImage;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserImageResource userImageResource = new UserImageResource();
        ReflectionTestUtils.setField(userImageResource, "userImageRepository", userImageRepository);
        this.restUserImageMockMvc = MockMvcBuilders.standaloneSetup(userImageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        userImage = new UserImage();
        userImage.setName(DEFAULT_NAME);
        userImage.setPath(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createUserImage() throws Exception {
        int databaseSizeBeforeCreate = userImageRepository.findAll().size();

        // Create the UserImage

        restUserImageMockMvc.perform(post("/api/userImages")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userImage)))
                .andExpect(status().isCreated());

        // Validate the UserImage in the database
        List<UserImage> userImages = userImageRepository.findAll();
        assertThat(userImages).hasSize(databaseSizeBeforeCreate + 1);
        UserImage testUserImage = userImages.get(userImages.size() - 1);
        assertThat(testUserImage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserImage.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void getAllUserImages() throws Exception {
        // Initialize the database
        userImageRepository.saveAndFlush(userImage);

        // Get all the userImages
        restUserImageMockMvc.perform(get("/api/userImages?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(userImage.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }

    @Test
    @Transactional
    public void getUserImage() throws Exception {
        // Initialize the database
        userImageRepository.saveAndFlush(userImage);

        // Get the userImage
        restUserImageMockMvc.perform(get("/api/userImages/{id}", userImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(userImage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserImage() throws Exception {
        // Get the userImage
        restUserImageMockMvc.perform(get("/api/userImages/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserImage() throws Exception {
        // Initialize the database
        userImageRepository.saveAndFlush(userImage);

		int databaseSizeBeforeUpdate = userImageRepository.findAll().size();

        // Update the userImage
        userImage.setName(UPDATED_NAME);
        userImage.setPath(UPDATED_PATH);

        restUserImageMockMvc.perform(put("/api/userImages")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userImage)))
                .andExpect(status().isOk());

        // Validate the UserImage in the database
        List<UserImage> userImages = userImageRepository.findAll();
        assertThat(userImages).hasSize(databaseSizeBeforeUpdate);
        UserImage testUserImage = userImages.get(userImages.size() - 1);
        assertThat(testUserImage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserImage.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void deleteUserImage() throws Exception {
        // Initialize the database
        userImageRepository.saveAndFlush(userImage);

		int databaseSizeBeforeDelete = userImageRepository.findAll().size();

        // Get the userImage
        restUserImageMockMvc.perform(delete("/api/userImages/{id}", userImage.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<UserImage> userImages = userImageRepository.findAll();
        assertThat(userImages).hasSize(databaseSizeBeforeDelete - 1);
    }
}
