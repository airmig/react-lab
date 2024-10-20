import React, {useEffect} from "react";
import { useFormik, useFormikContext } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  const handleSubmit = (values) => {
    // values contains form data
    console.log(values);
    submit('http://api', values);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: ""
    },
    onSubmit: (values, actions) => { 
      submit('url', values)
       .finally(() => {
        let rc;
        let rcmessage;
        try{
          rc = response.type;
          rcmessage = response.message;
        }
        catch{
          rc = 'error';
          rcmessage = 'Something went wrong, please try again later!';
        }
        onOpen(rc, rcmessage);
        actions.setSubmitting(false); // End the submission state
        if (rc == "success") 
          actions.resetForm(); // Optionally reset the form
      });
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Name is required'), // Required validation message
      email: Yup.string().email('Invalid email address').required('Email is required'), // Email validation
      comment: Yup.string().min(25, 'Must be at least 25 characters').required('Description is required')
    })
  });
  formik.getFieldProps();
  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName} >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps('firstName')}
                />
                <FormErrorMessage>{formik.touched.firstName && formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.email && !!formik.errors.email} >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                <FormErrorMessage>{formik.touched.email && formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type">
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && !!formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps('comment')}
                />
                <FormErrorMessage>{formik.touched.comment && formik.errors.comment}</FormErrorMessage>
              </FormControl>
              { isLoading && <h1>....PROCESSING FORM.....</h1>}
              { !isLoading && <Button type="submit" colorScheme="purple" width="full">
                Submit
              </Button>}
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
