const About = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r to-rose-200 via-white from-sky-200 px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          About Us
        </h1>
        <p className="text-gray-500 mt-3">
          Building modern digital solutions with passion and precision.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            About Our IT Solutions
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We specialize in delivering high-quality IT solutions including 
            web development, full-stack applications, cloud integration, 
            and scalable software systems.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Our focus is to create secure, efficient, and innovative digital 
            products that help businesses grow and adapt in today’s fast-changing 
            technology landscape.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            From startups to enterprises, we build reliable solutions that 
            combine performance, usability, and modern design.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            About Me
          </h2>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Pawan Bhuyar
          </h3>

          <p className="text-indigo-500 font-medium mb-4">
            Full Stack Developer
          </p>

          <p className="text-gray-600 leading-relaxed">
            I am a passionate Full Stack Developer with strong expertise in 
            building modern, scalable, and high-performance web applications.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            I work with technologies like React, Node.js, JavaScript, 
            and modern frontend frameworks to create seamless user experiences 
            and robust backend systems.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            My goal is to transform ideas into real-world digital solutions 
            that are efficient, secure, and impactful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;