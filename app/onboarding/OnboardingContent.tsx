'use client';

import { useState, useEffect } from 'react';
import en from '@/locales/en.json';
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import Button from '@/app/components/Button';
import { RxChevronUp, RxChevronDown } from "react-icons/rx";

interface OnboardingContentProps {
  user: KindeUser | null;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface Education {
  institution: string;
  course: string;
  years: string;
  outcome: string;
}

interface Project {
  name: string;
  liveUrl: string;
  sourceUrl: string;
  description: string;
}

interface WorkExperienceFormProps {
  experiences: Experience[];
  updateExperience: (index: number, field: keyof Experience, value: string | boolean) => void;
  addExperience: () => void;
  deleteExperience: () => void;
}

interface EducationFormProps {
  educations: Education[];
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  addEducation: () => void;
  deleteEducation: () => void;
}

interface ProjectsFormProps {
  projects: Project[];
  updateProject: (index: number, field: keyof Project, value: string) => void;
  addProject: () => void;
  deleteProject: () => void;
}

interface SkillsFormProps {
  skills: Set<string>;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
}

export default function OnboardingContent({ user }: OnboardingContentProps) {
  const [isLoading, setIsLoading] = useState(!user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [otherUrls, setOtherUrls] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [experiences, setExperiences] = useState<Experience[]>([{ company: '', position: '', startDate: '', endDate: '', currentlyWorking: false, description: '' }]);
  const [educations, setEducations] = useState<Education[]>([{ institution: '', course: '', years: '', outcome: '' }]);
  const [projects, setProjects] = useState<Project[]>([{ name: '', liveUrl: '', sourceUrl: '', description: ''}]);
  const [skills, setSkills] = useState(new Set<string>());

  useEffect(() => {
    if (user) {
      console.log(user);
      setName(user.given_name && user.family_name ? `${user.given_name} ${user.family_name}` : '');
      setEmail(user.email || '');
      // setLinkedinUrl(user.linkedin_url || '');
      setLinkedinUrl('');
      setIsLoading(false);
    }
  }, [user]);

  const validateName = (value: string) => {
    const isValid = /^[a-zA-Z\s]+$/.test(value);
    setNameError(isValid ? '' : en.nameError);
    return isValid;
  };

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? '' : en.emailError);
    return isValid;
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: '', position: '', startDate: '', endDate: '', currentlyWorking: false, description: '' }]);
  };

  const deleteExperience = () => {
    if (experiences.length > 1) {
      setExperiences(experiences.slice(0, -1));
    }
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | boolean) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setExperiences(newExperiences);
  };

  const addEducation = () => {
    setEducations([...educations, { institution: '', course: '', years: '', outcome: '' }]);
  };

  const deleteEducation = () => {
    if (educations.length > 1) {
      setEducations(educations.slice(0, -1));
    }
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducations = [...educations];
    newEducations[index] = { ...newEducations[index], [field]: value };
    setEducations(newEducations);
  };

  const addProject = () => {
    setProjects([...projects, { name: '', liveUrl: '', sourceUrl: '', description: ''}]);
  };

  const deleteProject = () => {
    if (projects.length > 1) {
      setProjects(projects.slice(0, -1));
    }
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const addSkill = (skill: string) => {
    setSkills(new Set(skills).add(skill));
  };

  const removeSkill = (skill: string) => {
    const newSkills = new Set(skills);
    newSkills.delete(skill);
    setSkills(newSkills);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex space-x-4">
        <Button variant="upload">
          {en.uploadResume}
        </Button>
        <div className="w-px bg-gray-300"></div>
        <Button variant="linkedin">
          {en.importData}
        </Button>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">{en.name}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            placeholder={en.namePlaceholder}
            className={`w-full p-2 border-2 border-black rounded-lg ${nameError ? 'border-red-500' : ''}`}
          />
          {nameError && <p className="mt-1 text-sm font-bold text-red-500">{nameError}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">{en.emailId}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            placeholder={en.emailPlaceholder}
            className={`w-full p-2 border-2 border-black rounded-lg ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && <p className="mt-1 text-sm font-bold text-red-500">{emailError}</p>}
        </div>

        <div>
          <label htmlFor="linkedin" className="block mb-2 font-semibold">{en.linkedinUrl}</label>
          <input
            type="url"
            id="linkedin"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder={en.linkedinPlaceholder}
            className="w-full p-2 border-2 border-black rounded-lg"
            // disabled={!!user?.linkedin_url}
            disabled={false}
          />
        </div>

        <div>
          <label htmlFor="otherUrls" className="block mb-2 font-semibold">{en.otherUrls}</label>
          <input
            type="text"
            id="otherUrls"
            value={otherUrls}
            onChange={(e) => setOtherUrls(e.target.value)}
            placeholder={en.otherUrlsPlaceholder}
            className="w-full p-2 border-2 border-black rounded-lg"
          />
        </div>
      </form>

      <div className="border-2 border-black rounded-lg overflow-hidden">
        <Accordion>
          <AccordionItem title={en.workExperience}>
            <WorkExperienceForm 
              experiences={experiences}
              updateExperience={updateExperience}
              addExperience={addExperience}
              deleteExperience={deleteExperience}
            />
          </AccordionItem>
          <AccordionItem title={en.education}>
            <EducationForm 
              educations={educations}
              updateEducation={updateEducation}
              addEducation={addEducation}
              deleteEducation={deleteEducation}
            />
          </AccordionItem>
          <AccordionItem title={en.projects}>
            <ProjectsForm 
              projects={projects}
              updateProject={updateProject}
              addProject={addProject}
              deleteProject={deleteProject}
            />
          </AccordionItem>
          <AccordionItem title={en.skills}>
            <SkillsForm 
              skills={skills}
              addSkill={addSkill}
              removeSkill={removeSkill}
            />
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
}

function Accordion({ children }: AccordionProps) {
  return <div className="divide-y divide-gray-200">{children}</div>;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="w-full p-4 text-left font-semibold bg-[#ECECEC] hover:bg-[#E0E0E0] transition-colors flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <RxChevronUp className="h-5 w-5" /> : <RxChevronDown className="h-5 w-5" />}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}

function WorkExperienceForm({ experiences, updateExperience, addExperience, deleteExperience }: WorkExperienceFormProps) {
  const isExperienceValid = (exp: Experience) => {
    return exp.company !== '' && exp.position !== '' && exp.startDate !== '' && (exp.currentlyWorking || exp.endDate !== '');
  };

  const isAddButtonEnabled = isExperienceValid(experiences[experiences.length - 1]);

  return (
    <div>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-4">
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={`${en.company} *`} 
            value={exp.company} 
            onChange={(e) => updateExperience(index, 'company', e.target.value)} 
          />
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={`${en.position} *`} 
            value={exp.position} 
            onChange={(e) => updateExperience(index, 'position', e.target.value)} 
          />
          <div className="flex space-x-2 mb-2">
            <div className="flex-1">
              <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">{en.from} *</label>
              <input
                id={`startDate-${index}`}
                className="w-full p-2 border rounded"
                type="date"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">{en.to} *</label>
              <input
                id={`endDate-${index}`}
                className="w-full p-2 border rounded"
                type={exp.currentlyWorking ? "text" : "date"}
                value={exp.currentlyWorking ? "Present" : exp.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                disabled={exp.currentlyWorking}
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="flex justify-end items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={exp.currentlyWorking}
                onChange={(e) => {
                  updateExperience(index, 'currentlyWorking', e.target.checked);
                  if (e.target.checked) {
                    updateExperience(index, 'endDate', 'Present');
                  } else {
                    updateExperience(index, 'endDate', '');
                  }
                }}
              />
              <span className="ml-2 text-sm text-gray-600">{en.currentlyWorkingHere}</span>
            </label>
          </div>
          <textarea 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={en.description} 
            value={exp.description} 
            onChange={(e) => updateExperience(index, 'description', e.target.value)} 
          />
        </div>
      ))}
      <div className="flex space-x-2">
        <Button variant="secondary" className="max-w-10 w-fit min-w-fit" onClick={addExperience} disabled={!isAddButtonEnabled}>{en.addExperience}</Button>
        {experiences.length > 1 && (
          <Button variant="delete" className="max-w-10 w-fit min-w-fit" onClick={deleteExperience}>{en.delete}</Button>
        )}
      </div>
    </div>
  );
}

function EducationForm({ educations, updateEducation, addEducation, deleteEducation }: EducationFormProps) {
  const isEducationValid = (edu: Education) => {
    return edu.institution !== '' && edu.course !== '' && edu.years !== '';
  };

  const isAddButtonEnabled = isEducationValid(educations[educations.length - 1]);

  return (
    <div>
      {educations.map((edu, index) => (
        <div key={index} className="mb-4">
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={`${en.institution} *`} 
            value={edu.institution} 
            onChange={(e) => updateEducation(index, 'institution', e.target.value)} 
          />
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={`${en.course} *`} 
            value={edu.course} 
            onChange={(e) => updateEducation(index, 'course', e.target.value)} 
          />
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={`${en.yearsAttended} *`} 
            value={edu.years} 
            onChange={(e) => updateEducation(index, 'years', e.target.value)} 
          />
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={en.academicOutcome} 
            value={edu.outcome} 
            onChange={(e) => updateEducation(index, 'outcome', e.target.value)} 
          />
        </div>
      ))}
      <div className="flex space-x-2">
        <Button variant="secondary" className="max-w-10 w-fit min-w-fit" onClick={addEducation} disabled={!isAddButtonEnabled}>{en.addEducation}</Button>
        {educations.length > 1 && (
          <Button variant="delete" className="max-w-10 w-fit min-w-fit" onClick={deleteEducation}>{en.delete}</Button>
        )}
      </div>
    </div>
  );
}

function ProjectsForm({ projects, updateProject, addProject, deleteProject }: ProjectsFormProps) {
  const isProjectValid = (project: Project) => {
    return project.name !== '' && project.description !== '';
  };

  const isAddButtonEnabled = isProjectValid(projects[projects.length - 1]);

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="mb-4">
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={`${en.projectTitle} *`} 
            value={project.name} 
            onChange={(e) => updateProject(index, 'name', e.target.value)} 
          />
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={en.liveUrl} 
            value={project.liveUrl} 
            onChange={(e) => updateProject(index, 'liveUrl', e.target.value)} 
          />
          <input 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={en.sourceUrl} 
            value={project.sourceUrl} 
            onChange={(e) => updateProject(index, 'sourceUrl', e.target.value)} 
          />
          <textarea 
            className="w-full p-2 mb-2 border rounded" 
            placeholder={`${en.projectDescription} *`} 
            value={project.description} 
            onChange={(e) => updateProject(index, 'description', e.target.value.slice(0, 100))} 
          />
        </div>
      ))}
      <div className="flex space-x-2">
        <Button variant="secondary" className="max-w-10 w-fit min-w-fit" onClick={addProject} disabled={!isAddButtonEnabled}>{en.addProject}</Button>
        {projects.length > 1 && (
          <Button variant="delete" className="max-w-10 w-fit min-w-fit" onClick={deleteProject}>{en.delete}</Button>
        )}
      </div>
    </div>
  );
}

function SkillsForm({ skills, addSkill, removeSkill }: SkillsFormProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from(skills).map((skill) => (
          <span key={skill} className={`px-2 py-1 rounded text-white ${getRandomColor()}`}>
            {skill}
            <button className="ml-2" onClick={() => removeSkill(skill)}>×</button>
          </span>
        ))}
      </div>
      <select
        className="w-full p-2 border rounded mb-2"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => addSkill(e.target.value)}
        value=""
      >
        <option value="" disabled selected>{en.keySkills}</option>
        {Array.from(skills).map((skill) => (
          <option key={skill} value={skill}>{skill}</option>
        ))}
        <option value="new">{en.addSkill}</option>
      </select>
    </div>
  );
}

function getRandomColor() {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-orange-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500'];
  return colors[Math.floor(Math.random() * colors.length)];
}