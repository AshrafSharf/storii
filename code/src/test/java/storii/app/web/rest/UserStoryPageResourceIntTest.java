package storii.app.web.rest;

import storii.app.Application;
import storii.app.domain.UserStoryPage;
import storii.app.repository.UserStoryPageRepository;

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
 * Test class for the UserStoryPageResource REST controller.
 *
 * @see UserStoryPageResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class UserStoryPageResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";

    private static final Integer DEFAULT_LEVEL = 1;
    private static final Integer UPDATED_LEVEL = 2;

    private static final Integer DEFAULT_POSITION = 1;
    private static final Integer UPDATED_POSITION = 2;
    private static final String DEFAULT_TITLE = "AAAAA";
    private static final String UPDATED_TITLE = "BBBBB";
    private static final String DEFAULT_SERIALIZED_CONTENT = "AAAAA";
    private static final String UPDATED_SERIALIZED_CONTENT = "BBBBB";

    @Inject
    private UserStoryPageRepository userStoryPageRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restUserStoryPageMockMvc;

    private UserStoryPage userStoryPage;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserStoryPageResource userStoryPageResource = new UserStoryPageResource();
        ReflectionTestUtils.setField(userStoryPageResource, "userStoryPageRepository", userStoryPageRepository);
        this.restUserStoryPageMockMvc = MockMvcBuilders.standaloneSetup(userStoryPageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        userStoryPage = new UserStoryPage();
        userStoryPage.setName(DEFAULT_NAME);
        userStoryPage.setLevel(DEFAULT_LEVEL);
        userStoryPage.setPosition(DEFAULT_POSITION);
        userStoryPage.setTitle(DEFAULT_TITLE);
        userStoryPage.setSerialized_content(DEFAULT_SERIALIZED_CONTENT);
    }

    @Test
    @Transactional
    public void createUserStoryPage() throws Exception {
        int databaseSizeBeforeCreate = userStoryPageRepository.findAll().size();

        // Create the UserStoryPage

        restUserStoryPageMockMvc.perform(post("/api/userStoryPages")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStoryPage)))
                .andExpect(status().isCreated());

        // Validate the UserStoryPage in the database
        List<UserStoryPage> userStoryPages = userStoryPageRepository.findAll();
        assertThat(userStoryPages).hasSize(databaseSizeBeforeCreate + 1);
        UserStoryPage testUserStoryPage = userStoryPages.get(userStoryPages.size() - 1);
        assertThat(testUserStoryPage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserStoryPage.getLevel()).isEqualTo(DEFAULT_LEVEL);
        assertThat(testUserStoryPage.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testUserStoryPage.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testUserStoryPage.getSerialized_content()).isEqualTo(DEFAULT_SERIALIZED_CONTENT);
    }

    @Test
    @Transactional
    public void getAllUserStoryPages() throws Exception {
        // Initialize the database
        userStoryPageRepository.saveAndFlush(userStoryPage);

        // Get all the userStoryPages
        restUserStoryPageMockMvc.perform(get("/api/userStoryPages?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(userStoryPage.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)))
                .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)))
                .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
                .andExpect(jsonPath("$.[*].serialized_content").value(hasItem(DEFAULT_SERIALIZED_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getUserStoryPage() throws Exception {
        // Initialize the database
        userStoryPageRepository.saveAndFlush(userStoryPage);

        // Get the userStoryPage
        restUserStoryPageMockMvc.perform(get("/api/userStoryPages/{id}", userStoryPage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(userStoryPage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.serialized_content").value(DEFAULT_SERIALIZED_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserStoryPage() throws Exception {
        // Get the userStoryPage
        restUserStoryPageMockMvc.perform(get("/api/userStoryPages/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserStoryPage() throws Exception {
        // Initialize the database
        userStoryPageRepository.saveAndFlush(userStoryPage);

		int databaseSizeBeforeUpdate = userStoryPageRepository.findAll().size();

        // Update the userStoryPage
        userStoryPage.setName(UPDATED_NAME);
        userStoryPage.setLevel(UPDATED_LEVEL);
        userStoryPage.setPosition(UPDATED_POSITION);
        userStoryPage.setTitle(UPDATED_TITLE);
        userStoryPage.setSerialized_content(UPDATED_SERIALIZED_CONTENT);

        restUserStoryPageMockMvc.perform(put("/api/userStoryPages")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(userStoryPage)))
                .andExpect(status().isOk());

        // Validate the UserStoryPage in the database
        List<UserStoryPage> userStoryPages = userStoryPageRepository.findAll();
        assertThat(userStoryPages).hasSize(databaseSizeBeforeUpdate);
        UserStoryPage testUserStoryPage = userStoryPages.get(userStoryPages.size() - 1);
        assertThat(testUserStoryPage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserStoryPage.getLevel()).isEqualTo(UPDATED_LEVEL);
        assertThat(testUserStoryPage.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testUserStoryPage.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testUserStoryPage.getSerialized_content()).isEqualTo(UPDATED_SERIALIZED_CONTENT);
    }

    @Test
    @Transactional
    public void deleteUserStoryPage() throws Exception {
        // Initialize the database
        userStoryPageRepository.saveAndFlush(userStoryPage);

		int databaseSizeBeforeDelete = userStoryPageRepository.findAll().size();

        // Get the userStoryPage
        restUserStoryPageMockMvc.perform(delete("/api/userStoryPages/{id}", userStoryPage.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<UserStoryPage> userStoryPages = userStoryPageRepository.findAll();
        assertThat(userStoryPages).hasSize(databaseSizeBeforeDelete - 1);
    }
}
