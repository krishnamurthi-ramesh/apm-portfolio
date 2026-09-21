package com.krishna.portfolio.controller;

import com.krishna.portfolio.model.ContactMessage;
import com.krishna.portfolio.repository.ContactMessageRepository;
import com.krishna.portfolio.repository.EducationRepository;
import com.krishna.portfolio.repository.ExperienceRepository;
import com.krishna.portfolio.repository.ProjectRepository;
import com.krishna.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class PortfolioController {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final ContactMessageRepository contactMessageRepository;

    public PortfolioController(ProjectRepository projectRepository, SkillRepository skillRepository,
                               ExperienceRepository experienceRepository, EducationRepository educationRepository,
                               ContactMessageRepository contactMessageRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("projects", projectRepository.findAll());
        model.addAttribute("skills", skillRepository.findAll());
        model.addAttribute("experiences", experienceRepository.findAll());
        model.addAttribute("educations", educationRepository.findAll());
        model.addAttribute("contactMessage", new ContactMessage());
        return "index";
    }

    @PostMapping("/contact")
    public String submitContact(@ModelAttribute ContactMessage contactMessage, RedirectAttributes redirectAttributes) {
        if (contactMessage != null) {
            contactMessageRepository.save(contactMessage);
            redirectAttributes.addFlashAttribute("successMessage", "Thank you for reaching out! I'll get back to you soon.");
        }
        return "redirect:/#contact";
    }
}
