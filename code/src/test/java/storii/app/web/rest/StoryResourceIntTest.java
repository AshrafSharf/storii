package storii.app.web.rest;

import storii.app.Application;
import storii.app.domain.Story;
import storii.app.repository.StoryRepository;

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
 * Test class for the StoryResource REST controller.
 *
 * @see StoryResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class StoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_DESCRIPTION = "AAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBB";

    @Inject
    private StoryRepository storyRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restStoryMockMvc;

    private Story story;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        StoryResource storyResource = new StoryResource();
        ReflectionTestUtils.setField(storyResource, "storyRepository", storyRepository);
        this.restStoryMockMvc = MockMvcBuilders.standaloneSetup(storyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        story = new Story();
        story.setName(DEFAULT_NAME);
        story.setDescription(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createStory() throws Exception {
        int databaseSizeBeforeCreate = storyRepository.findAll().size();

        // Create the Story

        restStoryMockMvc.perform(post("/api/storys")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(story)))
                .andExpect(status().isCreated());

        // Validate the Story in the database
        List<Story> storys = storyRepository.findAll();
        assertThat(storys).hasSize(databaseSizeBeforeCreate + 1);
        Story testStory = storys.get(storys.size() - 1);
        assertThat(testStory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllStorys() throws Exception {
        // Initialize the database
        storyRepository.saveAndFlush(story);

        // Get all the storys
        restStoryMockMvc.perform(get("/api/storys?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(story.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getStory() throws Exception {
        // Initialize the database
        storyRepository.saveAndFlush(story);

        // Get the story
        restStoryMockMvc.perform(get("/api/storys/{id}", story.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(story.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStory() throws Exception {
        // Get the story
        restStoryMockMvc.perform(get("/api/storys/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStory() throws Exception {
        // Initialize the database
        storyRepository.saveAndFlush(story);

		int databaseSizeBeforeUpdate = storyRepository.findAll().size();

        // Update the story
        story.setName(UPDATED_NAME);
        story.setDescription(UPDATED_DESCRIPTION);

        restStoryMockMvc.perform(put("/api/storys")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(story)))
                .andExpect(status().isOk());

        // Validate the Story in the database
        List<Story> storys = storyRepository.findAll();
        assertThat(storys).hasSize(databaseSizeBeforeUpdate);
        Story testStory = storys.get(storys.size() - 1);
        assertThat(testStory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void deleteStory() throws Exception {
        // Initialize the database
        storyRepository.saveAndFlush(story);

		int databaseSizeBeforeDelete = storyRepository.findAll().size();

        // Get the story
        restStoryMockMvc.perform(delete("/api/storys/{id}", story.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Story> storys = storyRepository.findAll();
        assertThat(storys).hasSize(databaseSizeBeforeDelete - 1);
    }
}
