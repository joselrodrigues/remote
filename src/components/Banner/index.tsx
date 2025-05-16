import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Definición de tipos
interface CircleProps {
  size: number;
  top: number;
  left: number;
  offset: number;
}

interface HoverProps {
  isHovered: boolean;
}

interface ParallaxProps {
  offset: number;
}

interface HoverAndParallaxProps extends HoverProps, ParallaxProps {}

// Animación para el banner
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Componentes estilizados
const BannerContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(to right, #6d28d9, #3b82f6);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;
`;

const CircleElement = styled.div<CircleProps>`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0.25;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  transform: translateY(${props => props.offset}px);
  transition: transform 0.3s ease-out;
`;

const ContentContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  text-align: center;
`;

const Title = styled.h1<HoverAndParallaxProps>`
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  transform: translateY(${props => props.offset}px) scale(${props => props.isHovered ? 1.05 : 1});
  transition: transform 0.5s ease;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Divider = styled.div<HoverAndParallaxProps>`
  height: 4px;
  background-color: #fcd34d;
  margin-bottom: 1.5rem;
  transition: all 0.5s ease;
  width: ${props => props.isHovered ? '120px' : '96px'};
  transform: translateY(${props => props.offset}px);
`;

const Description = styled.p<ParallaxProps>`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 2rem;
  max-width: 42rem;
  transform: translateY(${props => props.offset}px);
  transition: transform 0.3s ease;
`;

const Button = styled.button<HoverAndParallaxProps>`
  padding: 0.75rem 2rem;
  background-color: #fcd34d;
  color: #1f2937;
  font-weight: bold;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(${props => props.offset}px) scale(${props => props.isHovered ? 1.1 : 1});
  box-shadow: ${props => props.isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'};

  &:hover {
    background-color: #fde68a;
  }
`;

// Interfaz para los círculos del fondo
interface CircleData {
  id: number;
  size: number;
  top: number;
  left: number;
}

// Componente principal
const Banner: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset: number = scrollPosition * 0.3;

  // Crear array para los elementos circulares del fondo
  const circles: CircleData[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 5,
    top: Math.random() * 100,
    left: Math.random() * 100
  }));

  return (
    <BannerContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background pattern */}
      <BackgroundPattern>
        {circles.map((circle: CircleData) => (
          <CircleElement
            key={circle.id}
            size={circle.size}
            top={circle.top}
            left={circle.left}
            offset={parallaxOffset}
          />
        ))}
      </BackgroundPattern>

      {/* Content container */}
      <ContentContainer>
        <Title isHovered={isHovered} offset={-parallaxOffset * 0.5}>
          Bienvenido a Mi Sitio
        </Title>

        <Divider isHovered={isHovered} offset={-parallaxOffset * 0.3} />

        <Description offset={-parallaxOffset * 0.2}>
          Descubre nuestros increíbles productos y servicios que transformarán tu experiencia digital
        </Description>

        <Button isHovered={isHovered} offset={-parallaxOffset * 0.1}>
          Explorar Ahora
        </Button>
      </ContentContainer>
    </BannerContainer>
  );
};

export default Banner;
