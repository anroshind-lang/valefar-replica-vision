import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage1 from '@/assets/hero-image-1.jpg';
import heroImage2 from '@/assets/hero-image-2.jpg';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={heroImage1}
          alt="About Valefar"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
              About Valefar
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Redefining Luxury Streetwear
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Valefar was born from a vision to bridge the gap between street culture 
                and luxury fashion. Founded in 2024, we set out to create clothing that 
                speaks to the urban spirit while maintaining the highest standards of 
                craftsmanship and quality.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Every piece in our collection tells a story—of rebellion, of sophistication, 
                of the streets that shaped us and the dreams that drive us forward. We believe 
                that fashion should be fearless, authentic, and uncompromising.
              </p>
              <p className="text-lg text-muted-foreground">
                From our carefully selected fabrics to our meticulous attention to detail, 
                Valefar represents more than just clothing. We represent a lifestyle, a 
                statement, and a commitment to excellence that resonates with those who 
                refuse to settle for ordinary.
              </p>
            </div>
            <div className="relative">
              <img
                src={heroImage2}
                alt="Valefar craftsmanship"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">Q</span>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-4">Quality</h3>
              <p className="text-muted-foreground">
                We source only the finest materials and work with skilled artisans 
                to ensure every piece meets our exacting standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">A</span>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-4">Authenticity</h3>
              <p className="text-muted-foreground">
                Our designs stay true to street culture while pushing boundaries 
                and challenging conventional fashion norms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">E</span>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                From design to delivery, we pursue excellence in every aspect 
                of our business and customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            To create luxury streetwear that empowers individuals to express their 
            unique identity while maintaining the highest standards of quality, 
            sustainability, and ethical production practices.
          </p>
          <Link
            to="/shop"
            className="btn-luxury inline-flex items-center space-x-2"
          >
            <span>Explore Collection</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              The Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the creative minds behind Valefar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Creative Director",
                image: heroImage1,
              },
              {
                name: "Maya Patel",
                role: "Head of Design",
                image: heroImage2,
              },
              {
                name: "Jordan Kim",
                role: "Brand Manager",
                image: heroImage1,
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 object-cover mx-auto mb-4 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <h3 className="text-xl font-playfair font-bold mb-2">
                  {member.name}
                </h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;