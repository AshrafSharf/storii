package storii.app.web.rest;

import storii.app.Application;
import storii.app.domain.UserStory;
import storii.app.repository.UserStoryRepository;

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
 * Test class for the UserStoryResource REST controller.
 *
 * @see UserStoryResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class UserStoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_AUTHOR_NAME = "AAAAA";
    private static final String UPDATED_AUTHOR_NAME = "BBBBB";
    private static final String DEFAULT_CO_AUTHOR_NAME = "AAAAA";
    private static final String UPDATED_CO_AUTHOR_NAME = "BBBBB";

    private static final Integer DEFAULT_IS_PUBLISHED = 1;
    private static final Integer UPDATED_IS_PUBLISHED = 2;

    @Inject
    private UserStoryRepository userStoryRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUserStoryMockMvc;

    private UserStory userStory;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserStoryResource userStoryResource = new UserStoryResource();
        ReflectionTestUtils.setField(userStoryResource, "userStoryRepository", userStoryRepository);
        this.restUserStoryMockMvc = MockMvcBuilders.standaloneSetup(userStoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        userStory = new UserStory();
        userStory.setName(DEFAULT_NAME);
        userStory.setAuthor_name(DEFAULT_AUTHOR_NAME);
        userStory.setCo_author_name(DEFAULT_CO_AUTHOR_NAME);
        userStory.setIsPublished(DEFAULT_IS_PUBLISHED);
    }

    @Test
    @Transactional
    public void createUserStory() throws Exception {
        int databaseSizeBeforeCreate = userStoryRepository.findAll().size();

        // Create the UserStory

        restUserStoryMockMvc.perform(post("/api/userStorys")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStory)))
                .andExpect(status().isCreated());

        // Validate the UserStory in the database
        List<UserStory> userStorys = userStoryRepository.findAll();
        assertThat(userStorys).hasSize(databaseSizeBeforeCreate + 1);
        UserStory testUserStory = userStorys.get(userStorys.size() - 1);
        assertThat(testUserStory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserStory.getAuthor_name()).isEqualTo(DEFAULT_AUTHOR_NAME);
        assertThat(testUserStory.getCo_author_name()).isEqualTo(DEFAULT_CO_AUTHOR_NAME);
        assertThat(testUserStory.getIsPublished()).isEqualTo(DEFAULT_IS_PUBLISHED);
    }

    @Test
    @Transactional
    public void getAllUserStorys() throws Exception {
        // Initialize the database
        userStoryRepository.saveAndFlush(userStory);

        // Get all the userStorys
        restUserStoryMockMvc.perform(get("/api/userStorys?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(userStory.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].author_name").value(hasItem(DEFAULT_AUTHOR_NAME.toString())))
                .andExpect(jsonPath("$.[*].co_author_name").value(hasItem(DEFAULT_CO_AUTHOR_NAME.toString())))
                .andExpect(jsonPath("$.[*].isPublished").value(hasItem(DEFAULT_IS_PUBLISHED)));
    }

    @Test
    @Transactional
    public void getUserStory() throws Exception {
        // Initialize the database
        userStoryRepository.saveAndFlush(userStory);

        // Get the userStory
        restUserStoryMockMvc.perform(get("/api/userStorys/{id}", userStory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(userStory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.author_name").value(DEFAULT_AUTHOR_NAME.toString()))
            .andExpect(jsonPath("$.co_author_name").value(DEFAULT_CO_AUTHOR_NAME.toString()))
            .andExpect(jsonPath("$.isPublished").value(DEFAULT_IS_PUBLISHED));
    }

    @Test
    @Transactional
    public void getNonExistingUserStory() throws Exception {
        // Get the userStory
        restUserStoryMockMvc.perform(get("/api/userStorys/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserStory() throws Exception {
        // Initialize the database
        userStoryRepository.saveAndFlush(userStory);

		int databaseSizeBeforeUpdate = userStoryRepository.findAll().size();

        // Update the userStory
        userStory.setName(UPDATED_NAME);
        userStory.setAuthor_name(UPDATED_AUTHOR_NAME);
        userStory.setCo_author_name(UPDATED_CO_AUTHOR_NAME);
        userStory.setIsPublished(UPDATED_IS_PUBLISHED);

        restUserStoryMockMvc.perform(put("/api/userStorys")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStory)))
                .andExpect(status().isOk());

        // Validate the UserStory in the database
        List<UserStory> userStorys = userStoryRepository.findAll();
        assertThat(userStorys).hasSize(databaseSizeBeforeUpdate);
        UserStory testUserStory = userStorys.get(userStorys.size() - 1);
        assertThat(testUserStory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserStory.getAuthor_name()).isEqualTo(UPDATED_AUTHOR_NAME);
        assertThat(testUserStory.getCo_author_name()).isEqualTo(UPDATED_CO_AUTHOR_NAME);
        assertThat(testUserStory.getIsPublished()).isEqualTo(UPDATED_IS_PUBLISHED);
    }

    @Test
    @Transactional
    public void deleteUserStory() throws Exception {
        // Initialize the database
        userStoryRepository.saveAndFlush(userStory);

		int databaseSizeBeforeDelete = userStoryRepository.findAll().size();

        // Get the userStory
        restUserStoryMockMvc.perform(delete("/api/userStorys/{id}", userStory.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<UserStory> userStorys = userStoryRepository.findAll();
        assertThat(userStorys).hasSize(databaseSizeBeforeDelete - 1);
    }
}
