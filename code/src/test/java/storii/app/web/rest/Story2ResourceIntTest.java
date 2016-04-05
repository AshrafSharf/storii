package storii.app.web.rest;

import storii.app.Application;
import storii.app.domain.Story2;
import storii.app.repository.Story2Repository;

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
 * Test class for the Story2Resource REST controller.
 *
 * @see Story2Resource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class Story2ResourceIntTest {

    private static final String DEFAULT_MEH = "AAAAA";
    private static final String UPDATED_MEH = "BBBBB";
    private static final String DEFAULT_AF = "AAAAA";
    private static final String UPDATED_AF = "BBBBB";

    @Inject
    private Story2Repository story2Repository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restStory2MockMvc;

    private Story2 story2;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        Story2Resource story2Resource = new Story2Resource();
        ReflectionTestUtils.setField(story2Resource, "story2Repository", story2Repository);
        this.restStory2MockMvc = MockMvcBuilders.standaloneSetup(story2Resource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        story2 = new Story2();
        story2.setMeh(DEFAULT_MEH);
        story2.setAf(DEFAULT_AF);
    }

    @Test
    @Transactional
    public void createStory2() throws Exception {
        int databaseSizeBeforeCreate = story2Repository.findAll().size();

        // Create the Story2

        restStory2MockMvc.perform(post("/api/story2s")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(story2)))
                .andExpect(status().isCreated());

        // Validate the Story2 in the database
        List<Story2> story2s = story2Repository.findAll();
        assertThat(story2s).hasSize(databaseSizeBeforeCreate + 1);
        Story2 testStory2 = story2s.get(story2s.size() - 1);
        assertThat(testStory2.getMeh()).isEqualTo(DEFAULT_MEH);
        assertThat(testStory2.getAf()).isEqualTo(DEFAULT_AF);
    }

    @Test
    @Transactional
    public void getAllStory2s() throws Exception {
        // Initialize the database
        story2Repository.saveAndFlush(story2);

        // Get all the story2s
        restStory2MockMvc.perform(get("/api/story2s?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(story2.getId().intValue())))
                .andExpect(jsonPath("$.[*].meh").value(hasItem(DEFAULT_MEH.toString())))
                .andExpect(jsonPath("$.[*].af").value(hasItem(DEFAULT_AF.toString())));
    }

    @Test
    @Transactional
    public void getStory2() throws Exception {
        // Initialize the database
        story2Repository.saveAndFlush(story2);

        // Get the story2
        restStory2MockMvc.perform(get("/api/story2s/{id}", story2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(story2.getId().intValue()))
            .andExpect(jsonPath("$.meh").value(DEFAULT_MEH.toString()))
            .andExpect(jsonPath("$.af").value(DEFAULT_AF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStory2() throws Exception {
        // Get the story2
        restStory2MockMvc.perform(get("/api/story2s/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStory2() throws Exception {
        // Initialize the database
        story2Repository.saveAndFlush(story2);

		int databaseSizeBeforeUpdate = story2Repository.findAll().size();

        // Update the story2
        story2.setMeh(UPDATED_MEH);
        story2.setAf(UPDATED_AF);

        restStory2MockMvc.perform(put("/api/story2s")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(story2)))
                .andExpect(status().isOk());

        // Validate the Story2 in the database
        List<Story2> story2s = story2Repository.findAll();
        assertThat(story2s).hasSize(databaseSizeBeforeUpdate);
        Story2 testStory2 = story2s.get(story2s.size() - 1);
        assertThat(testStory2.getMeh()).isEqualTo(UPDATED_MEH);
        assertThat(testStory2.getAf()).isEqualTo(UPDATED_AF);
    }

    @Test
    @Transactional
    public void deleteStory2() throws Exception {
        // Initialize the database
        story2Repository.saveAndFlush(story2);

		int databaseSizeBeforeDelete = story2Repository.findAll().size();

        // Get the story2
        restStory2MockMvc.perform(delete("/api/story2s/{id}", story2.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Story2> story2s = story2Repository.findAll();
        assertThat(story2s).hasSize(databaseSizeBeforeDelete - 1);
    }
}
