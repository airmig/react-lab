import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
    return <>
    <VStack shadow="sm" backgroundColor="white"
    borderRadius="md" align="start">
    <Image src={imageSrc}/>  
    <Heading p={3} color="black">{title}</Heading>
    <HStack p={3} color="black"><Text>{description}</Text>
    </HStack>
    <Text p={3} color="black">See more<FontAwesomeIcon icon={faArrowRight}/></Text>
      </VStack>

  </>;
};

export default Card;
