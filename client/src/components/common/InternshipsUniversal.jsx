import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
  FaClipboardList,
  FaTimes,
  FaClock,
  FaCheck,
  FaBuilding,
  FaArrowLeft,
  FaRunning,
  FaStar,
  FaQuestion,
  FaFilter,

} from "react-icons/fa";
import Spinner from "../common/Spinner";
import getUserIdFromToken from "../student/auth/authUtils";
import TimeAgo from "../common/TimeAgo";
import api from "../common/server_url";
import { toast } from "react-toastify";
// import CustomDropdown from './utils/CustomDropdown';
import Select from "react-select";
import CustomRadio from "../student/utils/CustomRadio";
import StipendSlider from "../student/utils/StipendSlider";
import { useStudent } from "../student/context/studentContext";
// import CustomRadio from './utils/CustomRadio';

const InternshipsUniversal = () => {
  const [internships, setInternships] = useState([]);
  // const [appliedInternships, setAppliedInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState([]);
  const { login } = useStudent();
  const userId = getUserIdFromToken();
  const [filterOpen, setFilterOpen] = useState(true);
  const navigate = useNavigate();

  const statesAndUTs = [
    { value: "All Locations", label: "All Locations" },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Chennai", label: "Chennai" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Chandigarh", label: "Chandigarh" },
    {
      value: "Dadra and Nagar Haveli and Daman and Diu",
      label: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Delhi", label: "Delhi" },
    { value: "Puducherry", label: "Puducherry" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
  ];
  const jobProfiles = [
    "3D Animation",
    "Account Management",
    "Accounting & Auditing",
    "Acting/Performing Arts",
    "Administrative Assistant",
    "Advertising Specialist",
    "Aerospace Engineering",
    "AI (Artificial Intelligence)",
    "Android Development",
    "Animation Design",
    "App Developer",
    "Application Support Engineer",
    "Architecture",
    "Art Director",
    "Asset Management",
    "Assistant Producer",
    "Audio Engineer",
    "Automation Engineer",
    "Automotive Engineering",
    "AWS Development",
    "Back-End Development",
    "Bank Teller",
    "Banking Operations",
    "Big Data Engineer",
    "Bioinformatics Researcher",
    "Biomedical Engineering",
    "Blockchain Development",
    "Brand Management",
    "Broadcast Engineering",
    "Budget Analyst",
    "Building Inspector",
    "Business Analyst",
    "Business Consultant",
    "Business Development",
    "Business Intelligence Analyst",
    "Call Center Agent",
    "Cartography",
    "Chemical Engineering",
    "Civil Engineering",
    "Claims Adjuster",
    "Cloud Architect",
    "Cloud Computing",
    "Cloud Security Engineer",
    "Communications Specialist",
    "Compliance Officer",
    "Computer Hardware Engineer",
    "Construction Manager",
    "Content Creation",
    "Content Editor",
    "Content Management",
    "Content Marketing",
    "Content Strategist",
    "Content Writing",
    "Corporate Law Intern",
    "Corporate Trainer",
    "Cost Estimator",
    "Creative Director",
    "CRM Development",
    "Customer Success Manager",
    "Cybersecurity",
    "Data Analytics",
    "Data Architect",
    "Data Engineering",
    "Data Entry Clerk",
    "Data Governance Specialist",
    "Data Quality Analyst",
    "Data Science",
    "Database Administration",
    "Debt Collection Officer",
    "Dental Assistant",
    "Dentist",
    "Design Engineer",
    "Desktop Support Technician",
    "DevOps Engineer",
    "Digital Illustrator",
    "Digital Marketing",
    "Digital Product Designer",
    "E-Commerce Management",
    "Electrical Engineering",
    "Elementary School Teacher",
    "Embedded Systems Development",
    "Environmental Engineer",
    "ERP Development",
    "Event Coordination",
    "Event Management",
    "Exhibition Designer",
    "Fashion Design",
    "Fashion Marketing",
    "Fashion Stylist",
    "Film Director",
    "Film Editor",
    "FinTech Development",
    "Financial Analyst",
    "Financial Planner",
    "Fitness Trainer",
    "Flutter Development",
    "Food Technology",
    "Forensic Scientist",
    "Front-End Development",
    "Full-Stack Development",
    "Fundraising Coordinator",
    "Game Design",
    "Game Development",
    "General Practitioner (Doctor)",
    "Genetic Counselor",
    "Geologist",
    "Graphic Design",
    "Green Energy Consultant",
    "Hair Stylist",
    "Hardware Development",
    "Healthcare Administration",
    "Healthcare Management",
    "Hotel Management",
    "HR Business Partner",
    "HR Generalist",
    "HR Management",
    "HVAC Engineer",
    "Illustrator",
    "Industrial Designer",
    "Industrial Engineering",
    "Information Security Analyst",
    "Information Systems Manager",
    "Interior Design",
    "International Trade Specialist",
    "Investment Banking",
    "IT Consultant",
    "IT Security Specialist",
    "IT Support",
    "IT Systems Administrator",
    "Java Development",
    "Journalism",
    "Lab Technician",
    "Language Translation",
    "Law/Legal Intern",
    "Litigation Assistant",
    "Logistics Coordinator",
    "Machine Learning Engineer",
    "Maintenance Engineer",
    "Manufacturing Engineering",
    "Marine Biologist",
    "Market Research",
    "Marketing Analyst",
    "Marketing Manager",
    "Materials Engineer",
    "Mechanical Engineering",
    "Medical Assistant",
    "Medical Coding",
    "Medical Equipment Technician",
    "Medical Laboratory Scientist",
    "Medical Research",
    "Microbiologist",
    "Mobile App Development (Android)",
    "Mobile App Development (iOS)",
    "Motion Graphics Design",
    "Museum Curator",
    "Music Producer",
    "Network Administrator",
    "Network Engineer",
    "Nutritionist/Dietician",
    "Occupational Therapist",
    "Office Administrator",
    "Oil and Gas Engineer",
    "Operations Analyst",
    "Operations Management",
    "Packaging Design",
    "Paralegal",
    "Patent Analyst",
    "Payroll Specialist",
    "Performance Marketing Specialist",
    "Personal Assistant",
    "Petroleum Engineer",
    "Pharmacist",
    "Photographer",
    "PHP Development",
    "Physical Therapist",
    "Physiotherapist",
    "Pilates Instructor",
    "Policy Analyst",
    "Political Campaign Manager",
    "Portfolio Manager",
    "PR (Public Relations) Specialist",
    "Private Equity Analyst",
    "Product Design",
    "Product Management",
    "Production Assistant",
    "Production Engineer",
    "Project Management",
    "Property Manager",
    "Python Development",
    "Quality Assurance (QA)",
    "Quality Control Analyst",
    "React Native Development",
    "Real Estate Development",
    "Recruiter",
    "Renewable Energy Engineer",
    "Research Analyst",
    "Respiratory Therapist",
    "Restaurant Manager",
    "Risk Management Analyst",
    "Ruby on Rails Development",
    "Travels",
    "Tourism",
    "Web Development",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login();
      navigate(`/student/internships/${userId}`);
      return;
    }
  }, [navigate, userId]);

  useEffect(() => {
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    setFilterOpen(isLargeScreen);
  }, []);

  const [selectedLocation, setSelectedLocation] = useState([]);
  const [workType, setWorkType] = useState("All Internships");
  const [selectedStipend, setSelectedStipend] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchInternships = async () => {
      const cachedInternships = localStorage.getItem("cachedInternships");

      try {
        console.log("LocationName", selectedLocation);
        console.log("WorkType:", workType);
        console.log("profile", selectedProfile);


        const response = await axios.get(`${api}/student/internships`);

        // setAppliedInternships(appliedResponse.data);
        const sortedInternships = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const internshipsWithLogo = await Promise.all(
          sortedInternships.map(async (internship) => {
            if (internship.recruiter && internship.recruiter._id) {
              try {
                // Kick off the logo fetch but don't await it here
                const logoPromise = axios.get(
                  `${api}/recruiter/internship/${internship._id}/${internship.recruiter._id}/get-logo`,
                  { responseType: "blob" }
                );

                // Once the promise resolves, process the logo
                const res = await logoPromise;
                const logoBlob = new Blob([res.data], {
                  type: res.headers["content-type"],
                });
                const logoUrl = URL.createObjectURL(logoBlob);

                // Return the internship with the logo URL
                return {
                  ...internship,
                  logoUrl,
                };
              } catch (error) {
                console.error("Error fetching logo:", error);

                // Return internship with a default or null logo URL in case of an error
                return {
                  ...internship,
                  logoUrl: null, // Or use a default image URL here
                };
              }
            }

            // If no recruiter, return the internship as is
            return internship;
          })
        );

        setInternships(internshipsWithLogo);
        // localStorage.setItem('cachedInternships', JSON.stringify(internshipsWithLogo));
        console.log("internhsipswith logo", internshipsWithLogo);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching internships:", err);
        setError("Failed to fetch internships. Please try again later.");
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const handleRedirect = () => {
    navigate('/student/login');
  }

  const filteredInternships = internships.filter((internship) => {
    // Matches Work Type
    const matchesWorkType =
      workType === "All Internships" ||
      internship.internshipType.toLowerCase() === workType.toLowerCase();

    // Matches Job Profile
    const matchesJobProfile =
      selectedProfile.length == 0 ||
      selectedProfile.some(
        (profile) =>
          internship?.jobProfile?.toLowerCase() ===
          profile?.label?.toLowerCase()
      );
    // internship?.jobProfile?.toLowerCase() === selectedProfile?.label?.toLowerCase()

    // Matches Location
    console.log("this is selected location", selectedLocation);
    console.log("this is interns profile", internship.jobProfile);
    console.log("this is selected profile", selectedProfile);
    console.log("this is internship", internship);

    const matchesLocation =
      selectedLocation.length == 0 ||
      selectedLocation.some(
        (location) =>
          location?.label?.toLowerCase() ===
          internship?.internLocation?.toLowerCase()
      );
    // const matchesLocation = selectedLocation==='All Locations' ||
    //   selectedLocation.some(location => internship.internLocation.toLowerCase() === location.value.toLowerCase());

    // Matches Stipend
    const matchesStipend =
      selectedStipend === 0 || internship.stipend >= selectedStipend;

    // Return true if all filters match
    return (
      matchesWorkType && matchesJobProfile && matchesLocation && matchesStipend
    );
  });

  // console.log('this is selected location', selectedLocation);
  console.log("this is filtered internships", filteredInternships);



  const handleChange = (value) => {
    setSelectedLocation(value);
  };

  const handleReset = () => {
    setSelectedLocation([]);
    setWorkType("All Internships");
    setSelectedStipend(0);
    setSelectedProfile([]);
  };



  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-5 mt-0 min-h-screen bg-gray-100 relative">

      

      <h1 className="text-3xl font-bold mb-8 mt-8 text-center hidden lg:block">
        {filteredInternships.length} Total Internships
      </h1>

      <div className="flex flex-col lg:flex-row max-w-[1170px] mx-auto gap-10">

        {/* this below div is filter button */}
        <div className={`lg:hidden flex space-x-1 border-2 px-3 py-1 rounded-lg w-fit items-center bg-white hover:cursor-pointer hover:border-blue-400  ${filterOpen && 'border-blue-400'}`} onClick={() => setFilterOpen(!filterOpen)}>
          <span>Filters</span>
          <FaFilter className="hover:cursor-pointer text-blue-500" />
        </div>

        {/* this below div is filter box */}
        <div className={` ${filterOpen ? 'block' : 'hidden'} w-[84%] md:w-[70%] mx-auto lg:w-[30%] h-full lg:max-h-screen lg:mt-12 px-6 shadow-xl border-t py-6 overflow-y-hidden bg-white  relative`}>
          <h1 className="text-center font-extrabold text-xl tracking-widest">
            Filters
          </h1>
          <FaTimes onClick={() => setFilterOpen(false)} className="absolute right-3 top-5 lg:hidden text-blue-500 hover:cursor-pointer" />

          <p className="mb-4 mt-6">Type of Internship:</p>
          <button
            onClick={handleReset}
            className="absolute right-5 top-[76px] text-blue-400 underline"
          >
            Reset filters
          </button>
          <div className="flex flex-col space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="work-type"
                value="All Internships"
                checked={workType === "All Internships"}
                onChange={(e) => setWorkType(e.target.value)}
                className="form-radio text-blue-600 h-6 w-6 "
              />
              <span className="text-[17px]">All Internships</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="work-type"
                value="Work from Home"
                checked={workType === "Work from Home"}
                onChange={(e) => setWorkType(e.target.value)}
                className="form-radio text-green-600 h-6 w-6"
              />
              <span className="">Work from Home</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="work-type"
                value="Work from Office"
                checked={workType === "Work from Office"}
                onChange={(e) => setWorkType(e.target.value)}
                className="form-radio text-blue-600 h-6 w-6"
              />
              <span className="">Work from Office</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="work-type"
                value="Hybrid"
                checked={workType === "Hybrid"}
                onChange={(e) => setWorkType(e.target.value)}
                className="form-radio text-blue-600 h-6 w-6"
              />
              <span className="">Hybrid</span>
            </label>
          </div>
          <div className="my-4">
            <p>Profile</p>
            <Select
              value={selectedProfile}
              onChange={(values) => setSelectedProfile(values)}
              options={jobProfiles.map((job) => ({
                value: job,
                label: job,
              }))}
              isMulti
              placeholder="e.g Marketing"
              className="w-full mb-3 shadow-md"
            />
          </div>

          <StipendSlider
            selectedStipend={selectedStipend}
            setSelectedStipend={setSelectedStipend}
          />

          {(workType === "Work from Office" || workType === "Hybrid") && (
            <div className="mt-7">
              <p className="mt-6 mb-2 font-bold">Location</p>
              <Select
                options={statesAndUTs}
                values={selectedLocation}
                onChange={handleChange}
                placeholder="Select a location"
                searchable={true}
                isMulti
                className="w-full shadow-md"
              />
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-2 mt-2 text-center lg:hidden">
          {filteredInternships.length} Total Internships
        </h1>


        <div className="flex-1  lg:mt-10 ">
          <div className="flex flex-col justify-center bg-gray-100">

            {/* this below div is list of internships */}
            {filteredInternships.map((internship) => (
              <div
                key={internship._id}
                className="bg-white shadow-md rounded-lg px-3 py-3 w-full my-3 mx-auto relative"
              >
                <div className="flex justify-between items-center">
                  <div className="mb-4">
                    <h2 className="text-lg lg:text-2xl font-semibold md:mb-2">
                      {internship.internshipName}
                    </h2>
                    <p className="text-gray-600">
                      {internship.recruiter.companyName}
                    </p>
                  </div>

                  {internship.logoUrl ? (
                    <img
                      src={internship.logoUrl}
                      alt={internship.logoUrl}
                      className=" w-20 h-20"
                    />
                  ) : (
                    <FaBuilding />
                  )}
                </div>

                <div className="flex flex-col text-sm md:text-base md:space-x-3 md:flex-row ">
                  <div className="flex  items-center text-gray-700 mb-2">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>
                      {internship.internLocation
                        ? `${internship.internLocation}`
                        : "Remote"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700 mb-2">
                    <FaClock className="mr-2" />
                    <span>{internship.duration} Months</span>
                  </div>

                  {internship.stipendType === "unpaid" && (
                    <div className="flex items-center text-gray-700 mb-2">
                      <FaMoneyBillWave className="mr-1" />
                      <span>Unpaid</span>
                    </div>
                  )}

                  {internship.stipendType !== "unpaid" && (
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center text-gray-700 mb-2">
                        <FaMoneyBillWave className="mr-1" />
                        <span>
                          {internship.currency} {internship.stipend} /month
                        </span>
                      </div>

                      {internship.stipendType === "performance-based" && (
                        <div className="flex items-center mb-2 text-gray-700">
                          <span>+ incentives</span>
                          <div className="relative group ">
                            <FaQuestion className="border border-black p-1 mx-1 rounded-full hover:cursor-pointer" />
                            <span className="absolute hidden group-hover:block bg-gray-700 text-white text-base rounded p-1 w-[250px]">
                              This is a Performance Based internship.{" "}
                              {internship.incentiveDescription}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* {isAlreadyApplied(internship._id) && (
                  <p className="text-green-600 text-sm md:text-base inline-flex rounded-xl border border-green-600 px-2 py-1">
                    Applied
                    <FaCheck className="ml-2 mt-1" />
                  </p>
                )} */}
                <div className="flex text-sm md:text-base space-x-4 items-center">
                  <div
                    className={`${internship.studentCount < 20
                      ? "text-green-500"
                      : "text-gray-500"
                      } my-2 w-[30%] md:w-auto`}
                  >
                    {internship.studentCount} Applicants
                  </div>

                  {internship.studentCount < 20 && (
                    <div className="flex  space-x-2 items-center">
                      <FaRunning className="text-yellow-500  w-5 h-5" />
                      <span className="text-gray-500">
                        Be an early Applicant
                      </span>
                    </div>
                  )}

                  {internship.ppoCheck === "yes" && (
                    <div className="text-gray-500 flex space-x-2 items-center">
                      <FaStar /> <span>Internship with job offer</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-500 mb-2 md:mb-4 text-sm md:text-base">
                  Posted: {TimeAgo(internship.createdAt)}
                </p>

                <button onClick={handleRedirect} className="bg-blue-500 text-white px-4 py-1 rounded-md">Apply</button>




              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipsUniversal;