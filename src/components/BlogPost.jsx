import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import './BlogPost.css';
import './BlogSection.css';

// Sample blog posts data - in a real app, this would come from an API
const blogPosts = {
  'career-tips': {
    title: '10 Tips for Career Advancement in 2024',
    category: 'Career Development',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'May 15, 2024',
    content: `
      <p>Career advancement requires strategic planning, continuous skill development, and effective networking. Here are ten actionable tips to help you progress in your career this year:</p>
      
      <h3>1. Set Clear, Measurable Goals</h3>
      <p>Define specific, achievable career objectives with timelines. Break them down into smaller milestones to track your progress effectively.</p>
      
      <h3>2. Develop In-Demand Skills</h3>
      <p>Research skills that are highly valued in your industry. Invest time in learning those that align with your career path through courses, certifications, or hands-on projects.</p>
      
      <h3>3. Build a Strong Professional Network</h3>
      <p>Cultivate relationships with colleagues, industry peers, and mentors. Attend industry events, join professional groups, and engage actively on LinkedIn.</p>
      
      <h3>4. Seek Regular Feedback</h3>
      <p>Request constructive criticism from supervisors and colleagues. Use feedback to identify areas for improvement and demonstrate your commitment to growth.</p>
      
      <h3>5. Take Initiative Beyond Your Role</h3>
      <p>Volunteer for projects outside your direct responsibilities. This demonstrates versatility and readiness for more significant challenges.</p>
      
      <h3>6. Document Your Achievements</h3>
      <p>Maintain a record of your accomplishments, quantifying results whenever possible. This portfolio will be valuable during performance reviews and job interviews.</p>
      
      <h3>7. Find a Mentor</h3>
      <p>Seek guidance from someone experienced in your field. Their insights can help you navigate career challenges and identify opportunities.</p>
      
      <h3>8. Improve Your Soft Skills</h3>
      <p>Work on communication, leadership, and emotional intelligence. These skills are crucial as you advance into more senior positions.</p>
      
      <h3>9. Stay Industry-Informed</h3>
      <p>Follow industry trends, subscribe to relevant publications, and participate in webinars. Being knowledgeable shows dedication and foresight.</p>
      
      <h3>10. Prioritize Work-Life Balance</h3>
      <p>Prevent burnout by maintaining boundaries between work and personal life. Sustainable career growth requires physical and mental well-being.</p>
      
      <p>Remember that career advancement is a marathon, not a sprint. Consistent effort and strategic planning will yield better results than seeking quick promotions.</p>
    `
  },
  'market-trends': {
    title: 'Emerging Job Market Trends',
    category: 'Industry Trends',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'May 10, 2024',
    content: `
      <p>The job market is evolving rapidly due to technological advancements, shifting economic priorities, and changing work preferences. Understanding these trends can help you position yourself advantageously in your career journey.</p>
      
      <h3>Remote Work Becomes Permanent</h3>
      <p>What began as a necessity during the pandemic has evolved into a standard work arrangement. Companies are adopting hybrid models that combine in-office and remote work, offering flexibility while maintaining collaboration.</p>
      
      <h3>AI and Automation Integration</h3>
      <p>As artificial intelligence becomes more sophisticated, roles are being redefined. While some tasks are being automated, new positions focusing on AI oversight, ethics, and development are emerging.</p>
      
      <h3>Increased Demand for Digital Skills</h3>
      <p>Technical proficiencies are becoming essential across industries. Data analysis, digital marketing, and programming knowledge are valuable even in traditionally non-technical roles.</p>
      
      <h3>Growth in the Green Economy</h3>
      <p>Environmental sustainability initiatives are creating numerous opportunities in renewable energy, sustainable construction, and eco-friendly product development.</p>
      
      <h3>Rise of the Gig Economy</h3>
      <p>Contract and freelance work continue to expand, offering flexibility for workers and agility for companies. This model is extending beyond creative fields into professional services and technical roles.</p>
      
      <p>Staying informed about these trends and aligning your skills accordingly will help you remain competitive in the evolving job market.</p>
    `
  },
  'digital-skills': {
    title: 'Essential Skills for the Digital Age',
    category: 'Professional Skills',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'May 5, 2024',
    content: `
      <p>The digital transformation of the workplace requires professionals to continuously adapt and expand their skill sets. Here are the most valuable digital competencies to develop:</p>
      
      <h3>Data Literacy</h3>
      <p>The ability to read, understand, create, and communicate data is becoming essential across roles. Familiarity with data visualization tools and basic statistical concepts enables better decision-making.</p>
      
      <h3>Digital Communication</h3>
      <p>Proficiency in virtual collaboration tools, clear written communication, and effective virtual presentation skills are crucial in remote and hybrid work environments.</p>
      
      <h3>Cybersecurity Awareness</h3>
      <p>Understanding basic security principles and recognizing potential threats helps protect organizational data and systems. This knowledge is increasingly valued in all positions.</p>
      
      <h3>Coding Fundamentals</h3>
      <p>Basic programming knowledge allows professionals to automate repetitive tasks, understand technical discussions, and better collaborate with development teams.</p>
      
      <h3>Digital Marketing Skills</h3>
      <p>Familiarity with SEO, content marketing, and social media strategies helps professionals contribute to their organization's online presence and customer engagement.</p>
      
      <h3>Adaptability and Continuous Learning</h3>
      <p>Perhaps the most important digital skill is the ability to quickly learn and adapt to new tools and platforms as they emerge.</p>
      
      <p>Investing time in developing these competencies will increase your value in the workplace and open new career opportunities in the digital economy.</p>
    `
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="blog-post-container">
          <div className="blog-post-content">
            <h2>Blog Post Not Found</h2>
            <p>The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="back-to-blog">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="blog-post-container">
        <motion.div 
          className="blog-post-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="blog-post-meta">
            <span className="blog-post-category">{post.category}</span>
            <span className="blog-post-date">{post.date}</span>
            <span className="blog-post-read-time">{post.readTime}</span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
        </motion.div>
        
        <motion.div 
          className="blog-post-featured-image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={post.image} alt={post.title} />
        </motion.div>
        
        <motion.div 
          className="blog-post-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <motion.div 
          className="blog-post-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPost; 