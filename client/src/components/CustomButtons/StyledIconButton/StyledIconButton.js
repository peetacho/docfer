import { IconButton } from "@chakra-ui/react"

const StyledIconButton = ({
    bg,
    hw,
    icon,
    ...otherProps
}) => {
    return (
        <IconButton
            bg={bg}
            height={hw}
            width={hw}
            isRound
            icon={icon}
            _hover={{ bg: bg, opacity: 0.8 }}
            _active={{ bg: bg }}
            {...otherProps}
        />
    )
}

export default StyledIconButton;