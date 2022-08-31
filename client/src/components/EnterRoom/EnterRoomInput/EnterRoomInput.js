import { Flex, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { FaArrowRight, FaRandom } from 'react-icons/fa'
import GhostButton from "../../CustomButtons/GhostButton/GhostButton"
import { Formik, Field, Form, useFormikContext } from "formik";
import { nano } from "../../../utils/utils";

const EnterRoomInput = ({
    validateRoomCode,
    handleSubmit
}) => {

    const RandomizeButton = () => {
        const { setFieldValue } = useFormikContext();
        return (
            <GhostButton ariaLabel='randomize' icon={<FaRandom size={'1.2rem'} />} onClick={() => {
                const id = nano()
                setFieldValue('roomCodeInput', id)
            }} />
        )
    }

    return (
        <>
            <Formik
                initialValues={{ roomCodeInput: '' }}
                onSubmit={(values) => {
                    handleSubmit(values.roomCodeInput)
                }}>
                {(props) => (
                    <Form>
                        <Field name='roomCodeInput' validate={validateRoomCode}>
                            {({ field, form }) => (
                                <InputGroup width='100%'>
                                    <FormControl isInvalid={form.errors.roomCodeInput && form.touched.roomCodeInput}>
                                        <Input
                                            {...field}
                                            borderRadius={'10px'}
                                            placeholder='Enter any room code'
                                            background={'rgba(255, 255, 255, 0.1)'}
                                            border={'1px solid'}
                                            borderColor={'rgba(255, 255, 255, 0.11)'}
                                            height={'58px'}
                                            px={'20px'}
                                            py={'18px'}
                                            color={'white'}
                                            _invalid={{ borderColor: 'errorRed.400', boxShadow: '0 0 0 1px var(--chakra-colors-errorRed-400)' }}
                                            _placeholder={{ color: 'white', fontFamily: 'Lexend', fontSize: '18px', lineHeight: '22.5px', fontWeight: 500 }}
                                            _hover={{ borderColor: 0 }}
                                            _focus={{ border: '1px solid rgba(255, 255, 255, 0.4)' }}
                                            _focusVisible={{ borderColor: 'initial', boxShadow: 'none' }}
                                        />
                                        <FormErrorMessage
                                            color={'errorRed.400'}
                                            fontFamily={'Inter'}>
                                            {form.errors.roomCodeInput}
                                        </FormErrorMessage>
                                        <InputRightElement height={'58px'} width={'100px'}>
                                            <Flex
                                                flexDirection={'row'}
                                                gap={'5px'}
                                                mr={'10px'}>
                                                <RandomizeButton />
                                                <GhostButton ariaLabel='submit' icon={<FaArrowRight size={'1.2rem'} />} type={'submit'} />
                                            </Flex>
                                        </InputRightElement>
                                    </FormControl>
                                </InputGroup>
                            )}
                        </Field>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EnterRoomInput;