// src/components/AvatarButton/index.tsx

import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface AvatarButtonProps {
  source: any;
  onPress: () => void;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({ source, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.avatarButton}>
      <Image source={source} style={styles.avatarImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatarButton: {
    // Estilos para o TouchableOpacity do AvatarButton
  },
  avatarImage: {
    // Estilos para a imagem do avatar
  },
});

export default AvatarButton;
