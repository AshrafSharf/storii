package storii.app.web.rest;

import storii.app.Application;
import storii.app.domain.UserStoryImage;
import storii.app.repository.UserStoryImageRepository;

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
 * Test class for the UserStoryImageResource REST controller.
 *
 * @see UserStoryImageResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class UserStoryImageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_PATH = "AAAAA";
    private static final String UPDATED_PATH = "BBBBB";

    @Inject
    private UserStoryImageRepository userStoryImageRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUserStoryImageMockMvc;

    private UserStoryImage userStoryImage;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserStoryImageResource userStoryImageResource = new UserStoryImageResource();
        ReflectionTestUtils.setField(userStoryImageResource, "userStoryImageRepository", userStoryImageRepository);
        this.restUserStoryImageMockMvc = MockMvcBuilders.standaloneSetup(userStoryImageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        userStoryImage = new UserStoryImage();
        userStoryImage.setName(DEFAULT_NAME);
        userStoryImage.setPath(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createUserStoryImage() throws Exception {
        int databaseSizeBeforeCreate = userStoryImageRepository.findAll().size();

        // Create the UserStoryImage

        restUserStoryImageMockMvc.perform(post("/api/userStoryImages")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStoryImage)))
                .andExpect(status().isCreated());

        // Validate the UserStoryImage in the database
        List<UserStoryImage> userStoryImages = userStoryImageRepository.findAll();
        assertThat(userStoryImages).hasSize(databaseSizeBeforeCreate + 1);
        UserStoryImage testUserStoryImage = userStoryImages.get(userStoryImages.size() - 1);
        assertThat(testUserStoryImage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserStoryImage.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void getAllUserStoryImages() throws Exception {
        // Initialize the database
        userStoryImageRepository.saveAndFlush(userStoryImage);

        // Get all the userStoryImages
        restUserStoryImageMockMvc.perform(get("/api/userStoryImages?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(userStoryImage.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }

    @Test
    @Transactional
    public void getUserStoryImage() throws Exception {
        // Initialize the database
        userStoryImageRepository.saveAndFlush(userStoryImage);

        // Get the userStoryImage
        restUserStoryImageMockMvc.perform(get("/api/userStoryImages/{id}", userStoryImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(userStoryImage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserStoryImage() throws Exception {
        // Get the userStoryImage
        restUserStoryImageMockMvc.perform(get("/api/userStoryImages/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserStoryImage() throws Exception {
        // Initialize the database
        userStoryImageRepository.saveAndFlush(userStoryImage);

		int databaseSizeBeforeUpdate = userStoryImageRepository.findAll().size();

        // Update the userStoryImage
        userStoryImage.setName(UPDATED_NAME);
        userStoryImage.setPath(UPDATED_PATH);

        restUserStoryImageMockMvc.perform(put("/api/userStoryImages")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStoryImage)))
                .andExpect(status().isOk());

        // Validate the UserStoryImage in the database
        List<UserStoryImage> userStoryImages = userStoryImageRepository.findAll();
        assertThat(userStoryImages).hasSize(databaseSizeBeforeUpdate);
        UserStoryImage testUserStoryImage = userStoryImages.get(userStoryImages.size() - 1);
        assertThat(testUserStoryImage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserStoryImage.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void deleteUserStoryImage() throws Exception {
        // Initialize the database
        userStoryImageRepository.saveAndFlush(userStoryImage);

		int databaseSizeBeforeDelete = userStoryImageRepository.findAll().size();

        // Get the userStoryImage
        restUserStoryImageMockMvc.perform(delete("/api/userStoryImages/{id}", userStoryImage.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<UserStoryImage> userStoryImages = userStoryImageRepository.findAll();
        assertThat(userStoryImages).hasSize(databaseSizeBeforeDelete - 1);
    }
}
