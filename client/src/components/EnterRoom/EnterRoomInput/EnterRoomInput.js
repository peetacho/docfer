import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { FaArrowRight, FaRandom } from 'react-icons/fa'
import GhostButton from "../../CustomButtons/GhostButton/GhostButton"

const EnterRoomInput = ({
    validateRoomCode,
    handleSubmit,
    setInputRoomCode
}) => {
    return (
        <>
            <InputGroup width='100%'>
                <Input
                    borderRadius={'10px'}
                    placeholder='Enter any room code'
                    background={'rgba(255, 255, 255, 0.1)'}
                    border={'1px solid'}
                    borderColor={'rgba(255, 255, 255, 0.11)'}
                    height={'58px'}
                    px={'20px'}
                    py={'18px'}
                    color={'white'}
                    _placeholder={{ color: 'white', fontFamily: 'Lexend', fontSize: '18px', lineHeight: '22.5px', fontWeight: 500 }}
                    _hover={{ borderColor: 0 }}
                    _focus={{ border: '1px solid rgba(255, 255, 255, 0.4)' }}
                    _focusVisible={{ borderColor: 'initial', boxShadow: 'none' }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            if (validateRoomCode(e.target.value)) {
                                handleSubmit(e.target.value)
                            }
                        }
                    }}
                    onChange={e => setInputRoomCode(e.target.value)}
                />
                <InputRightElement h={'full'} width={'100px'}>
                    <Flex
                        flexDirection={'row'}
                        gap={'5px'}
                        mr={'10px'}>
                        <GhostButton ariaLabel='randomize' icon={<FaRandom size={'1.2rem'} />} />
                        <GhostButton ariaLabel='submit' icon={<FaArrowRight size={'1.2rem'} />} />
                    </Flex>
                </InputRightElement>
            </InputGroup>
        </>
    )
}

export default EnterRoomInput;