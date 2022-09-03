import React from 'react';
import {
    Box,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import {
    FiMenu,
    FiLogOut,
    FiHome
} from 'react-icons/fi';
import { BsGithub } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import BlueIconTextButton from '../../CustomButtons/BlueIconTextButton/BlueIconTextButton';
import GhostButton from '../../CustomButtons/GhostButton/GhostButton';
import useLocalStorage from '../../../hooks/useLocalStorage';

const LinkItems = [
    { name: 'Home', icon: FiHome, link: '/' },
    { name: 'Github Repo', icon: BsGithub, link: 'https://github.com/peetacho/docfer' }
];

export default function RoomNavBar({ children, roomID }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={'gray.100'}>
            <SidebarContent
                onClose={() => onClose}
                roomID={roomID}
                display={{ base: 'none', md: 'block' }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent roomID={roomID} onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Flex ml={{ base: 0, md: '375px' }} px="50px" height={{ base: '90vh', md: '100vh' }} >
                {children}
            </Flex>
        </Box>
    );
}

const SidebarContent = ({ onClose, roomID, ...rest }) => {
    const [localRoomCode, setLocalRoomCode] = useLocalStorage('room-code')
    return (
        <Box
            pos="fixed"
            w={{ base: 'full', md: '375px' }}
            {...rest}>
            <Box
                bg={useColorModeValue('white', 'gray.900')}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                w={{ base: 'full', md: '375px' }}
                pos="fixed"
                h="full"
                color={'primary.400'}>
                <Flex mt={{ base: '12px', md: '35px' }} mb={{ base: 0, md: '30px' }} alignItems="center" px={{ base: 4, md: '24px' }} justifyContent="space-between">
                    <Box>
                        <Text fontSize={{ base: '28px', md: '48px' }} fontFamily={'Lexend'} fontWeight={500}>Doc<Text as={'span'} color='brand.400' fontFamily={'inherit'}>Fer</Text></Text>
                        <Text fontSize={'12px'} fontFamily={'Inter'} fontWeight={400}>
                            Room Code: {roomID}
                        </Text>
                    </Box>
                    <GhostButton
                        display={{ base: 'flex', md: 'none' }}
                        aria-label="close menu"
                        icon={<IoCloseOutline size='1.4rem' />}
                        onClick={onClose}
                        color={'primary.400'}
                    />
                </Flex>
                {LinkItems.map((linkItem) => (
                    <NavItem key={linkItem.name} icon={linkItem.icon} link={linkItem.link}>
                        {linkItem.name}
                    </NavItem>
                ))}
            </Box>
            <Box
                pos={"fixed"}
                bottom={0}
                px={{ base: 4, md: '24px' }}
                py={'40px'}
                w={{ base: 'full', md: '375px' }}>
                <BlueIconTextButton text={'Leave Room'} icon={FiLogOut} onClick={() => {
                    setLocalRoomCode(null)
                    window.location = '/enter-room'
                }} />
            </Box>
        </Box>
    );
};

const NavItem = ({ icon, children, link, ...rest }) => {
    return (
        <Box
            py={'20px'}
            mx={{ base: 4, md: '24px' }}
            color={'secondary.400'}>
            <Link href={link} target="_blank" textDecoration={'none !important'} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    role="group"
                    cursor="pointer"
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="20px"
                            w={'25px'}
                            h={'25px'}
                            as={icon}
                        />
                    )}
                    <Text
                        fontSize={'22px'}
                        lineHeight={'25px'}
                        fontWeight={600}
                        fontFamily={'Inter'}>
                        {children}
                    </Text>
                </Flex>
            </Link>
        </Box>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={'white'}
            borderBottomWidth="1px"
            borderBottomColor={'gray.200'}
            justifyContent="space-between"
            {...rest}>
            <Text fontSize={'20px'} fontFamily={'Lexend'} fontWeight={500}>Doc<Text as={'span'} color='brand.400' fontFamily={'inherit'}>Fer</Text></Text>
            <GhostButton
                aria-label="open menu"
                icon={<FiMenu />}
                onClick={onOpen}
                color={'primary.400'}
            />
        </Flex>
    );
};