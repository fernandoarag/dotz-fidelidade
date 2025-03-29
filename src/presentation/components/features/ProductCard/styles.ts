import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%; /* Aspect ratio 4:3 */
  overflow: hidden;
`;

export const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PointsBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`;

export const UnavailableBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
`;

export const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.regular};
  color: ${({ theme }) => theme.colors.black};
`;

export const ProductDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray.dark};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  flex: 1;
`;

export const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;
