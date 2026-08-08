package com.krishna.portfolio;

import com.krishna.portfolio.model.Education;
import com.krishna.portfolio.model.Experience;
import com.krishna.portfolio.model.Project;
import com.krishna.portfolio.model.Skill;
import com.krishna.portfolio.repository.EducationRepository;
import com.krishna.portfolio.repository.ExperienceRepository;
import com.krishna.portfolio.repository.ProjectRepository;
import com.krishna.portfolio.repository.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;

    public DataSeeder(ProjectRepository projectRepository, SkillRepository skillRepository,
                      ExperienceRepository experienceRepository, EducationRepository educationRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (projectRepository.count() == 0) {
            projectRepository.saveAll(List.of(
                new Project("Product Deep-Dive: Enterprise RAG System Evaluation", "Feb 2025", 
                    "<p><strong>The Product Problem:</strong> Shipping enterprise Generative AI features requires rigorous quality control, but evaluating unstructured AI outputs at scale is notoriously difficult for product teams.</p>" +
                    "<p><strong>The Product Strategy:</strong> Defined a comprehensive evaluation rubric (Recall@K, NDCG, Precision, Latency) to quantify output quality before shipping. Partnered with engineering to build a production-grade RAG pipeline (LangChain, FAISS, Ollama) that met these strict product requirements.</p>" +
                    "<div class='case-metrics'><strong>Product Impact:</strong><ul><li>Established a standardized evaluation framework for all future AI product releases.</li><li>De-risked the deployment of a highly experimental feature to enterprise clients.</li></ul></div>"
                ),
                new Project("Strategic Teardown: Reliability in Cost-Optimized AI Models", "2026", 
                    "<p><strong>The Product Risk:</strong> Deploying cost-optimized (quantized) AI models on edge hardware introduces significant hallucination risks, directly impacting user trust and retention.</p>" +
                    "<p><strong>The Solution & Trade-offs:</strong> Scoped a technical solution consisting of a density-drift detector and a two-tier inference cascade. Intelligently traded off latency, infrastructure cost, and reliability—the core 'product triangle' for shipping AI features.</p>"
                )
            ));

            skillRepository.saveAll(List.of(
                new Skill("Product Management & Strategy", "Roadmapping, PRDs, Go-To-Market Strategy, User Interviews, Wireframing (Figma), Agile/Scrum, Stakeholder Alignment"),
                new Skill("Data, Analytics & Growth", "KPI Definition, A/B Testing Fundamentals (Amplitude/Mixpanel concepts), SQL, RICE/Kano Prioritization, Ragas Framework"),
                new Skill("Technical Architecture & AI", "System Design concepts, REST APIs, LLM Integration, RAG, Docker, Python (Bridging the gap between engineering and business)")
            ));

            experienceRepository.saveAll(List.of(
                new Experience("Data Science Intern (Product Execution Focus)", "Meraqui Ventures Pvt. Ltd. (karam.ai)", "Apr 2025 - Jul 2025", 
                    "<p><strong>The Challenge:</strong> Define the product vision and execute the end-to-end lifecycle for an AI-driven candidate-matching feature to improve recruiter efficiency.</p>" +
                    "<p><strong>Product Execution:</strong> Owned the requirements-to-shipping loop. Conducted stakeholder interviews to define north-star success metrics. Wrote API contracts and drove platform integration with client ERP systems to ensure seamless user adoption.</p>" +
                    "<div class='case-metrics'><strong>Business Impact:</strong><ul><li><strong>15% Increase in Match Precision:</strong> Directly improving the recruiter's core user journey.</li><li><strong>15% Reduction in Manual Entry:</strong> Driving higher product adoption and customer satisfaction.</li><li><strong>12-15% Decrease in Data Inconsistencies:</strong> Built schema-validated pipelines to establish user trust.</li></ul></div>"
                ),
                new Experience("Development Engineering Intern", "Treacle Technologies (Incubated at IIT Kanpur)", "Jun 2024 - Aug 2024", 
                    "<p><strong>The Problem:</strong> Internal ops teams faced massive friction and delayed response times when detecting incidents across distributed systems scaling to 100k+ logs/day.</p>" +
                    "<p><strong>The Solution:</strong> Translated this operational pain point into a measurable product requirement. Designed and specified real-time monitoring dashboards (Grafana, Elasticsearch) tailored to the ops team's specific workflows.</p>" +
                    "<div class='case-metrics'><strong>Business Impact:</strong><ul><li><strong>40% Reduction in Incident Detection Time:</strong> Massively improving platform reliability and SLA compliance.</li><li><strong>80% Removal of Manual Effort:</strong> Streamlined operations, saving hundreds of engineering hours per quarter.</li></ul></div>"
                )
            ));

            educationRepository.saveAll(List.of(
                new Education("Indian Institute of Management Visakhapatnam", "Post-Graduate Program in Management (PGPMCI)", "2025 - 2027"),
                new Education("IIITDM Kurnool", "B.Tech, Computer Science and Engineering", "2022 - 2026")
            ));
        }
    }
}
