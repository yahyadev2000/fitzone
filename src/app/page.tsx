'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <TrainersSection />
      <MembershipSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  )
}

// Hero Section
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Animate stats counter when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.unobserve(entry.target)
        }
      })
    })

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: 'MEMBERS', target: 500, suffix: '+' },
    { label: 'EXPERT TRAINERS', target: 15, suffix: '+' },
    { label: 'CLIENT SATISFACTION', target: 95, suffix: '%' }
  ]

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              translateY: [-20, 20],
              translateX: [-10, 10],
              rotate: [-5, 5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          TRANSFORM YOUR BODY.<br />
          <span className="text-primary">ELEVATE YOUR MIND.</span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Experience the pinnacle of fitness innovation with world-class training, luxury facilities, and personalized wellness programs.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90">
            START FREE TRIAL
          </Button>
          <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            VIEW PLANS
          </Button>
        </motion.div>

        {/* Animated Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={statsVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
                initial={{ scale: 0.5 }}
                animate={statsVisible ? { scale: 1 } : { scale: 0.5 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                {statsVisible ? stat.target : 0}{stat.suffix}
              </motion.div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const values = [
    { title: 'SCIENCE-BACKED TRAINING', description: 'Evidence-based fitness programs designed by certified professionals', progress: 95 },
    { title: 'LUXURY FACILITIES', description: 'State-of-the-art equipment and premium amenities', progress: 98 },
    { title: '24/7 SUPPORT', description: 'Round-the-clock assistance and guidance', progress: 92 }
  ]

  return (
    <section ref={ref} className="py-20 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ x: -50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              ABOUT <span className="text-primary">FITZONE ELITE</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              initial={{ x: -50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              We're not just a gym – we're a transformation destination. Our mission is to empower individuals to achieve their peak physical and mental potential through cutting-edge fitness solutions, personalized coaching, and a supportive community.
            </motion.p>
            
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.6 + index * 0.2 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{value.title}</h3>
                    <span className="text-primary font-bold">{value.progress}%</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{value.description}</p>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div 
                      className="bg-primary h-2 rounded-full" 
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${value.progress}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item, index) => (
                <motion.div 
                  key={item} 
                  className="relative overflow-hidden rounded-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary/30">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  const services = [
    {
      title: 'Personal Training',
      description: 'One-on-one coaching with certified trainers',
      details: 'Customized workout plans, nutritional guidance, and 24/7 support',
      icon: '🏋️'
    },
    {
      title: 'Nutrition Plans',
      description: 'Personalized meal plans and supplements',
      details: 'Science-based nutrition strategies tailored to your goals',
      icon: '🥗'
    },
    {
      title: 'Group Classes',
      description: 'High-energy group fitness sessions',
      details: 'Yoga, HIIT, spinning, and specialized group programs',
      icon: '👥'
    },
    {
      title: 'Recovery Center',
      description: 'Advanced recovery and wellness services',
      details: 'Massage therapy, cryotherapy, and relaxation zones',
      icon: '🧘'
    },
    {
      title: 'Sports Performance',
      description: 'Athletic training and conditioning',
      details: 'Sport-specific programs for competitive athletes',
      icon: '🏆'
    },
    {
      title: 'Wellness Coaching',
      description: 'Holistic health and lifestyle guidance',
      details: 'Mental wellness, stress management, and lifestyle optimization',
      icon: '💫'
    }
  ]

  const handleCardFlip = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index)
  }

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            PREMIUM <span className="text-primary">SERVICES</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Discover our comprehensive range of fitness and wellness services designed to transform your life.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${flippedCard === index ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleCardFlip(index)}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <motion.p 
                    className="text-sm text-muted-foreground"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: flippedCard === index ? 1 : 0,
                      height: flippedCard === index ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.details}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, Tech Startup',
      content: 'FitZone Elite transformed my life. The personalized training program helped me lose 30 pounds and gain confidence I never knew I had.',
      avatar: '👩'
    },
    {
      name: 'Mike Chen',
      role: 'Professional Athlete',
      content: 'The sports performance program took my career to the next level. The trainers are world-class and the facilities are unmatched.',
      avatar: '👨'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Fitness Enthusiast',
      content: 'I love the community here! The group classes are energizing and the wellness coaching has helped me find balance in my life.',
      avatar: '👩‍🦰'
    }
  ]

  return (
    <section ref={ref} className="py-20 px-4 bg-muted/50 relative overflow-hidden">
      {/* Particle System */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              translateX: [-100, 100],
              translateY: [-100, 100],
              scale: [0.5, 1.5],
              opacity: [0.3, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            SUCCESS <span className="text-primary">STORIES</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear from our members who have transformed their lives with FitZone Elite.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-card/80">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{testimonial.avatar}</div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Trainers Section
function TrainersSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const trainers = [
    {
      name: 'Alex Thompson',
      specialty: 'Strength & Conditioning',
      experience: '10+ years',
      avatar: '🏋️‍♂️',
      social: ['💪', '📱', '📧']
    },
    {
      name: 'Maria Garcia',
      specialty: 'Yoga & Wellness',
      experience: '8+ years',
      avatar: '🧘‍♀️',
      social: ['🧘', '📱', '📧']
    },
    {
      name: 'David Kim',
      specialty: 'Sports Performance',
      experience: '12+ years',
      avatar: '🏃‍♂️',
      social: ['🏃', '📱', '📧']
    },
    {
      name: 'Lisa Wang',
      specialty: 'Nutrition & Diet',
      experience: '6+ years',
      avatar: '🥗',
      social: ['🥗', '📱', '📧']
    }
  ]

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ELITE <span className="text-primary">TRAINERS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet our team of certified professionals dedicated to helping you achieve your fitness goals.
          </p>
        </motion.div>

        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex-shrink-0"
            >
              <Card className="w-80 backdrop-blur-sm bg-card/80 hover:scale-105 transition-transform">
                <CardHeader className="text-center">
                  <div className="text-8xl mb-4">{trainer.avatar}</div>
                  <CardTitle className="text-xl">{trainer.name}</CardTitle>
                  <CardDescription>{trainer.specialty}</CardDescription>
                  <Badge variant="secondary">{trainer.experience}</Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex justify-center gap-4 text-2xl">
                    {trainer.social.map((social, i) => (
                      <motion.span 
                        key={i} 
                        className="cursor-pointer hover:text-primary transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Membership Section
function MembershipSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const plans = [
    {
      name: 'Basic',
      price: '$49',
      period: '/month',
      features: ['Access to gym equipment', 'Group classes', 'Basic nutrition guide', 'Mobile app access'],
      popular: false
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      features: ['Everything in Basic', '4 Personal training sessions', 'Advanced nutrition plan', 'Recovery center access', 'Priority booking'],
      popular: true
    },
    {
      name: 'Elite',
      price: '$199',
      period: '/month',
      features: ['Everything in Pro', 'Unlimited personal training', 'Custom meal planning', 'Sports performance program', '24/7 trainer access', 'VIP amenities'],
      popular: false
    }
  ]

  return (
    <section ref={ref} className="py-20 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            MEMBERSHIP <span className="text-primary">PLANS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan that fits your fitness goals and lifestyle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {plan.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Badge className="bg-primary text-primary-foreground px-4 py-2">
                    MOST POPULAR
                  </Badge>
                </motion.div>
              )}
              <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? 'default' : 'outline'}>
                    GET STARTED
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Gallery Section
function GallerySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All Areas' },
    { id: 'strength', name: 'Strength Training' },
    { id: 'cardio', name: 'Cardio Zone' },
    { id: 'wellness', name: 'Wellness Center' },
    { id: 'classes', name: 'Group Classes' }
  ]

  const galleryItems = [
    { 
      id: 1, 
      category: 'strength',
      title: 'Powerlifting Platform', 
      description: 'Olympic-grade weightlifting equipment',
      icon: '🏋️'
    },
    { 
      id: 2, 
      category: 'cardio',
      title: 'HIIT Training Zone', 
      description: 'High-intensity interval training area',
      icon: '🏃'
    },
    { 
      id: 3, 
      category: 'wellness',
      title: 'Recovery Lounge', 
      description: 'Premium recovery and relaxation space',
      icon: '🧘'
    },
    { 
      id: 4, 
      category: 'classes',
      title: 'Yoga Studio', 
      description: 'Serene environment for mind-body practice',
      icon: '🧘‍♀️'
    },
    { 
      id: 5, 
      category: 'strength',
      title: 'Functional Training', 
      description: 'Movement-based strength equipment',
      icon: '💪'
    },
    { 
      id: 6, 
      category: 'cardio',
      title: 'Virtual Cycling', 
      description: 'Immersive indoor cycling experience',
      icon: '🚴'
    },
    { 
      id: 7, 
      category: 'wellness',
      title: 'Hydrotherapy Pool', 
      description: 'Therapeutic water-based recovery',
      icon: '🏊'
    },
    { 
      id: 8, 
      category: 'classes',
      title: 'Dance Studio', 
      description: 'Dynamic group fitness programs',
      icon: '💃'
    }
  ]

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            IMMERSIVE FACILITY TOUR
          </motion.h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore our state-of-the-art facilities designed for ultimate performance and luxury
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0, rotateY: 90, opacity: 0 }}
              animate={inView ? { scale: 1, rotateY: 0, opacity: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 cursor-pointer"
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
              }}
            >
              {/* Card Background with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 p-6 h-48 flex flex-col justify-between">
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {item.icon}
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Hover Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              >
                <span className="text-white font-semibold">View Gallery →</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Live Tour
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            GET IN <span className="text-primary">TOUCH</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to start your fitness journey? Contact us today for a free consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your fitness goals..." rows={4} />
                </div>
                <motion.button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Visit our gym</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">📍 Location</h4>
                  <p className="text-muted-foreground">123 Fitness Street, Wellness City, WC 12345</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">📞 Phone</h4>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🕒 Hours</h4>
                  <p className="text-muted-foreground">24/7 Access for Members</p>
                  <p className="text-muted-foreground">Staff Hours: 6AM - 10PM Daily</p>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-sm">Interactive Map</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <footer ref={ref} className="bg-background border-t py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
       
            <h3 className="text-xl font-bold mb-4">FitZone Elite</h3>
            <p className="text-muted-foreground">
              Transform your body, elevate your mind. Experience the pinnacle of fitness innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Membership</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trainers</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>📞 (555) 123-4567</li>
              <li>📧 info@fitzoneelite.com</li>
              <li>📍 123 Fitness Street</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-2xl">
              <motion.span 
                className="cursor-pointer hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                📱
              </motion.span>
              <motion.span 
                className="cursor-pointer hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                📘
              </motion.span>
              <motion.span 
                className="cursor-pointer hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                📸
              </motion.span>
              <motion.span 
                className="cursor-pointer hover:text-primary transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                🐦
              </motion.span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 pt-8 border-t text-center text-muted-foreground"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p>&copy; 2024 FitZone Elite. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
