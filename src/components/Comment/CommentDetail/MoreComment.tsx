import { Button } from '@heroui/react'
import { FaChevronDown } from "react-icons/fa";

interface MoreCommentProp {
  limit: number,
  setLimit: (limit: number) => void
}

const MoreComment: React.FC<MoreCommentProp> = ({ limit, setLimit }) => {
  return (
    <Button className='w-full font-semibold' size='sm' variant='bordered' radius='full' onPress={() => setLimit(limit + 10)}>
      View more 10 comments <FaChevronDown />
    </Button>
  )
}

export default MoreComment