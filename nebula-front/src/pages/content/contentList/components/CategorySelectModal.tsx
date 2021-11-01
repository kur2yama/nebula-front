import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { Tree } from 'antd';
import * as services from '@/services/postCategory';
import Modal from 'antd/lib/modal/Modal';
import { descendantsById, randomString, treeToFlatten } from '@nebula/utils';

import type { EventDataNode } from 'antd/es/tree';
import type { TreeDataType } from '@nebula/utils';

export interface CategorySelectModalProps {
  visible: boolean;
  onCancel?: () => void;
  onOk?: (values: any) => void;
}

const CategorySelectModal: React.FC<CategorySelectModalProps> = (props) => {
  const { visible, onCancel, onOk } = props;
  const [value, setValue] = useState<React.Key[]>([]);
  // const [value] = useState<React.Key[]>([]);
  const [expandAll, setExpandAll] = useState(false);
  const categories = useRequest(services.search, { formatResult: (res) => res.data });

  const handleOk = () => {
    if (onOk && categories.data) {
      const flatCategories = treeToFlatten(categories.data);
      const data = value.map((key) => {
        const foundCategory = flatCategories.find((category) => category.value === key);
        if (foundCategory) {
          return {
            contentType: 'category',
            categoryId: foundCategory.id,
            title: foundCategory.title,
            description: foundCategory.description,
            cover: foundCategory.cover,
            key: randomString(),
            postsLength: 0,
            postsOrderBy: 'DESC',
          };
        }
        return {};
      });

      onOk(data);
    }
  };

  useEffect(() => {
    if (categories.data) {
      setExpandAll(true);
    }
  }, [categories.data]);

  useEffect(() => {
    return () => {
      if (!visible) {
        setValue([]);
      }
    };
  }, [visible]);

  const handleValueChange = (keys: React.Key[], checkedNode: EventDataNode) => {
    const newKeys = (() => {
      if (checkedNode.children) {
        const { id = '' } = checkedNode as TreeDataType;
        const allChildren = descendantsById(checkedNode.children as TreeDataType[], id);
        return keys.filter((key) => !allChildren.includes(key as string));
      }
      return keys;
    })();
    setValue(newKeys);
  };

  return (
    <Modal title="选择分类" visible={visible} width={640} onCancel={onCancel} onOk={handleOk}>
      <Tree
        defaultExpandAll={expandAll}
        treeData={categories.data || []}
        checkable
        multiple
        selectedKeys={value}
        checkedKeys={value}
        onCheck={(keys, { node }) => {
          handleValueChange(keys as React.Key[], node);
        }}
        onSelect={(keys, { node }) => {
          handleValueChange(keys, node);
        }}
      />
    </Modal>
  );
};

export default CategorySelectModal;
