package storii.app.web.rest;

import storii.app.Application;
import storii.app.domain.UserStoryPageImage;
import storii.app.repository.UserStoryPageImageRepository;

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
 * Test class for the UserStoryPageImageResource REST controller.
 *
 * @see UserStoryPageImageResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class UserStoryPageImageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_PATH = "AAAAA";
    private static final String UPDATED_PATH = "BBBBB";

    @Inject
    private UserStoryPageImageRepository userStoryPageImageRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUserStoryPageImageMockMvc;

    private UserStoryPageImage userStoryPageImage;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserStoryPageImageResource userStoryPageImageResource = new UserStoryPageImageResource();
        ReflectionTestUtils.setField(userStoryPageImageResource, "userStoryPageImageRepository", userStoryPageImageRepository);
        this.restUserStoryPageImageMockMvc = MockMvcBuilders.standaloneSetup(userStoryPageImageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        userStoryPageImage = new UserStoryPageImage();
        userStoryPageImage.setName(DEFAULT_NAME);
        userStoryPageImage.setPath(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createUserStoryPageImage() throws Exception {
        int databaseSizeBeforeCreate = userStoryPageImageRepository.findAll().size();

        // Create the UserStoryPageImage

        restUserStoryPageImageMockMvc.perform(post("/api/userStoryPageImages")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStoryPageImage)))
                .andExpect(status().isCreated());

        // Validate the UserStoryPageImage in the database
        List<UserStoryPageImage> userStoryPageImages = userStoryPageImageRepository.findAll();
        assertThat(userStoryPageImages).hasSize(databaseSizeBeforeCreate + 1);
        UserStoryPageImage testUserStoryPageImage = userStoryPageImages.get(userStoryPageImages.size() - 1);
        assertThat(testUserStoryPageImage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserStoryPageImage.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void getAllUserStoryPageImages() throws Exception {
        // Initialize the database
        userStoryPageImageRepository.saveAndFlush(userStoryPageImage);

        // Get all the userStoryPageImages
        restUserStoryPageImageMockMvc.perform(get("/api/userStoryPageImages?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(userStoryPageImage.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }

    @Test
    @Transactional
    public void getUserStoryPageImage() throws Exception {
        // Initialize the database
        userStoryPageImageRepository.saveAndFlush(userStoryPageImage);

        // Get the userStoryPageImage
        restUserStoryPageImageMockMvc.perform(get("/api/userStoryPageImages/{id}", userStoryPageImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(userStoryPageImage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserStoryPageImage() throws Exception {
        // Get the userStoryPageImage
        restUserStoryPageImageMockMvc.perform(get("/api/userStoryPageImages/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserStoryPageImage() throws Exception {
        // Initialize the database
        userStoryPageImageRepository.saveAndFlush(userStoryPageImage);

		int databaseSizeBeforeUpdate = userStoryPageImageRepository.findAll().size();

        // Update the userStoryPageImage
        userStoryPageImage.setName(UPDATED_NAME);
        userStoryPageImage.setPath(UPDATED_PATH);

        restUserStoryPageImageMockMvc.perform(put("/api/userStoryPageImages")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStoryPageImage)))
                .andExpect(status().isOk());

        // Validate the UserStoryPageImage in the database
        List<UserStoryPageImage> userStoryPageImages = userStoryPageImageRepository.findAll();
        assertThat(userStoryPageImages).hasSize(databaseSizeBeforeUpdate);
        UserStoryPageImage testUserStoryPageImage = userStoryPageImages.get(userStoryPageImages.size() - 1);
        assertThat(testUserStoryPageImage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserStoryPageImage.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void deleteUserStoryPageImage() throws Exception {
        // Initialize the database
        userStoryPageImageRepository.saveAndFlush(userStoryPageImage);

		int databaseSizeBeforeDelete = userStoryPageImageRepository.findAll().size();

        // Get the userStoryPageImage
        restUserStoryPageImageMockMvc.perform(delete("/api/userStoryPageImages/{id}", userStoryPageImage.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<UserStoryPageImage> userStoryPageImages = userStoryPageImageRepository.findAll();
        assertThat(userStoryPageImages).hasSize(databaseSizeBeforeDelete - 1);
    }
}
